<form enctype='multipart/form-data'>
    <input id='upload' type='file' name='files[]'>
</form>

<script src='bencode.js'></script>

<script>
    document.getElementById('upload').onchange = function(event){
        handleFileSelect(event);
    };

    function handleFileSelect(event){
        const reader = new FileReader();

        reader.onload = function(event){
            var ben = new Bencode(new Uint8Array(event.target.result)).decode();

            console.log(ben);
        }
        reader.readAsArrayBuffer(event.target.files[0]);
    }
</script>