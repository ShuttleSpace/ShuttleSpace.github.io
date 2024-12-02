---
title: 安卓发布纯 so 库到 maven
date: 2024-12-02T15:35:00
updated: 2024-12-02T15:35:00
permalink: 
top: 0
comments: 
copyright: true
tags:
  - android
  - gradle
categories: 
keywords: 
description:
---
这里是为了 flutter ffi plugin android 端可以直接使用动态库,所以将 so 打包到 aar 然后发布到 maven central

1、在 Maven Central 中注册账号
https://central.sonatype.com/

> 不要使用第三方 github/google 注册,因为后面配置发布时需要填写密码

2、注册完成后创建一个 namespace. namespace 需要配置dns解析才能生效

3、配置 gradle 插件, maven central 官方 现在还不支持 gradle,所以使用第三方插件

```groovy
buildscript {
	dependencies {
		classpath "com.vanniktech:gradle-maven-publish-plugin:0.30.0"
	}
}
android {
    publishing {
        // support split abi, name must coordinates with publications 
        multipleVariants('aar') {
            includeBuildTypeValues('release')
            includeFlavorDimensionAndValues(
                /*dimension =*/ 'abi',
                /*values =*/ 'arm', 'x86'
            )
            // allVariants()
            // withJavadocJar()
        }
    }
}
publishing {
    repositories {
        mavenLocal() // ~/.m2/respository
        maven {
            name = "quickjs"
            url = uri("https://maven.pkg.github.com/flutter-flujs/flujs_android_quickjs")
            credentials {
                username = System.getenv("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN")
            }
        }
        // build dir
        maven {
            name = 'myrepo'
            url = layout.buildDirectory.dir('repo')
        }
    }
    publications {
        aar(MavenPublication) {
            // from components.findByName("aar")
            groupId = Prop('GROUP')
            artifactId = Prop('POM_ARTIFACT_ID')
            version = Prop('VERSION_NAME')
            // afterEvaluate { from components.aar }
            // def aarTask = tasks.getByName('assembleRelease')
            // println("🌹 ${aarTask.outputs.files.singleFile}")
            // def aarFile = aarTask.outputs.files.singleFile
            // artifact("${project.buildDir}/outputs/aar/flujs-quickjs-arm-release.aar")

            pom {
                name = Prop('POM_NAME')
                description = Prop('POM_DESCRIPTION')
                url = Prop('POM_URL')
                licenses {
                    license {
                        name = Prop('POM_LICENSE_NAME')
                        url = Prop('POM_LICENSE_URL')
                    }
                    developers {
                        developer {
                            id = Prop('POM_DEVELOPER_ID')
                            name = Prop('POM_DEVELOPER_NAME')
                            email = Prop('POM_DEVELOPER_EMAIL')
                        }
                    }
                    scm {
                        connection = Prop('POM_SCM_CONNECTION')
                        developerConnection = Prop('POM_SCM_DEV_CONNECTION')
                        url = Prop('POM_SCM_URL')
                    }
                }
            }
        }
    }
}
mavenPublishing {
    pomFromGradleProperties()
    publishToMavenCentral(SonatypeHost.CENTRAL_PORTAL, true) // 生成 to MavenCentral 的task,否则没有此task
    // configure(new AndroidMultiVariantLibrary(true, true, ['release'] as Set, ['abi': ['arm', 'x86'] as Set] as Map))
    configureBasedOnAppliedPlugins( false, false) // 默认使用 AndroidSingleVariantLibrary fat aar
    signAllPublications()
}
```

其中 `android { publishing {}}` 配置按 builtType 和 flavor 生成不同的 artificat 产物.`mavenPublishing {} 配置发布包到 MavenCentral`
```properties
android.ndkVersion=/Users/humphrey/Library/Android/sdk/ndk/27.1.12297006
# SONATYPE_HOST=DEFAULT
# or when publishing to https://s01.oss.sonatype.org
# SONATYPE_HOST=S01
// or when publishing to https://central.sonatype.com/
SONATYPE_HOST=CENTRAL_PORTAL

GROUP=cn.humphreyd.flujs-android
POM_ARTIFACT_ID=quickjs
VERSION_NAME=0.6.1-test

POM_NAME=flujs-quickjs
POM_DESCRIPTION=quickjs-ng for flujs..
POM_INCEPTION_YEAR=2024
POM_URL=https://github.com/flutter-flujs/flujs_android_quickjs

POM_LICENSE_NAME=The Apache Software License, Version 2.0
POM_LICENSE_URL=https://www.apache.org/licenses/LICENSE-2.0.txt

POM_SCM_URL=scm:git:https://github.com/flutter-flujs/flujs_android_quickjs.git
POM_SCM_CONNECTION=scm:git:https://github.com/flutter-flujs/flujs_android_quickjs.git
POM_SCM_DEV_CONNECTION=https://github.com/flutter-flujs/flujs_android_quickjs

POM_DEVELOPER_ID=ShuttleSpace
POM_DEVELOPER_NAME=ShuttleSpace
POM_DEVELOPER_EMAIL=dang8080@qq.com

RELEASE_SIGNING_ENABLED=true
# maven central account
mavenCentralUsername=xxx
mavenCentralPassword=xxx

signing.keyId=xxx
signing.password=xxx
signing.secretKeyRingFile= /Users/humphrey/.gnupg/secring.gpg
```

4、gpg
4.1 生成 gpg key
```sh
gpg --gen-key
gpg --export-secret-keys >~/.gnupg/secring.gpg
```
4.2 发布gpg 公钥
```sh
gpg --keyserver keyserver.ubuntu.com --send-keys
# - `keyserver.ubuntu.com`
# - `keys.openpgp.org`
```

https://central.sonatype.org/publish/requirements/gpg/#dealing-with-expired-keys
5、发布
```sh
gradle aR
gradle publishAarPublicationToMavenCentralRepository
```

```groovy
import com.vanniktech.maven.publish.SonatypeHost
import com.vanniktech.maven.publish.AndroidSingleVariantLibrary

def Prop(name) {
    return project.providers.gradleProperty(name)
}

group Prop("GROUP")
version Prop("VERSION_NAME")

buildscript {
    repositories {
        google()
        mavenCentral()
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }

    dependencies {
        classpath "com.android.tools.build:gradle:8.0.0"
        classpath "com.vanniktech:gradle-maven-publish-plugin:0.30.0"
    }
}

rootProject.allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

apply plugin: "com.android.library"
apply plugin: "maven-publish"
apply plugin: "com.vanniktech.maven.publish.base"

android {
    if (project.android.hasProperty("namespace")) {
        namespace = "cn.humphreyd.flujs"
    }
    compileSdkVersion 31
    ndkVersion = android.ndkVersion
    defaultConfig {
        aarMetadata {
            minCompileSdk = 16
        }
        minSdk = 16
    }
    sourceSets {
        main.jniLibs.srcDirs += "src/main/jniLibs"
    }
    publishing {
        singleVariant("aar") 
    }
}

publishing {
    repositories {
        mavenLocal() // ~/.m2/respository
        maven {
            name = "quickjs"
            url = uri("https://maven.pkg.github.com/flutter-flujs/flujs_android_quickjs")
            credentials {
                username = System.getenv("GITHUB_ACTOR") || Prop("GITHUB_ACTOR")
                password = System.getenv("GITHUB_TOKEN") || Prop("GITHUB_TOKEN")
            }
        }
        // build dir
        maven {
            name = 'myrepo'
            url = layout.buildDirectory.dir('repo')
        }
    }
    publications {
        aar(MavenPublication) {
            groupId = Prop('GROUP')
            artifactId = Prop('POM_ARTIFACT_ID')
            version = Prop('VERSION_NAME')
            
            def aarDir = project.file("${project.buildDir}/outputs/aar/")
            def aarFiles = aarDir.listFiles().findAll { it.name.endsWith('release.aar') }.collect { it.absolutePath }
            println("🌹 ${aarFiles}, ${artifacts}")
            artifacts = aarFiles

            pom {
                name = Prop('POM_NAME')
                description = Prop('POM_DESCRIPTION')
                url = Prop('POM_URL')
                licenses {
                    license {
                        name = Prop('POM_LICENSE_NAME')
                        url = Prop('POM_LICENSE_URL')
                    }
                    developers {
                        developer {
                            id = Prop('POM_DEVELOPER_ID')
                            name = Prop('POM_DEVELOPER_NAME')
                            email = Prop('POM_DEVELOPER_EMAIL')
                        }
                    }
                    scm {
                        connection = Prop('POM_SCM_CONNECTION')
                        developerConnection = Prop('POM_SCM_DEV_CONNECTION')
                        url = Prop('POM_SCM_URL')
                    }
                }
            }
        }
    }
}

def artifactName(flavor, version) {
    return "flujs-quickjs-${flavor}-${version}.aar"
}

mavenPublishing {
    pomFromGradleProperties()
    publishToMavenCentral(SonatypeHost.CENTRAL_PORTAL, true)
    // configure(new AndroidMultiVariantLibrary(true, true, ['release'] as Set, ['abi': ['arm', 'x86'] as Set] as Map))
    configureBasedOnAppliedPlugins( false, false)
    signAllPublications()
}
```

6、然后在 maven central 就能看到自己的库了
> 需要注意, maven central 不支持删除库. 所以建议先建一个测试空间确认好再发布正式.

