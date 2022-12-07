<script type="text/javascript" src="/js/love.js"></script>
<script>
    (function(){
        if('{{ page.password }}'){
            if (prompt('please input your password.') !== '{{ page.password }}'){
                alert('wrong password!!!');
                history.back();
            }
        }
    })();
</script>
