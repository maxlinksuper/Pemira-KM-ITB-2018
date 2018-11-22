// READING PHOTO AND PREVIEW
$(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
      
    });

    function readURL(input, onSuccess) {
        console.log("Reading file", input.files[0]);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('Data Successfully Loaded');
                onSuccess(e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this, function(base64Image) {
            $('#img-upload').attr('src', base64Image);
        });

    // Backend - POST with JQuery

    });   

    $('#formID').submit(function(event) {
        event.preventDefault();
        if (this.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            showSnackbar("Wrong input");
        }
        else {
            readURL($("#imgInp"), function(base64Image) {
                $.post( "mastah.php", { 
                    namalengkap : $('#name').val(), 
                    nim : $('#nim').val(),
                    panggilan : $('#username').val(),
                    nomorhp : $('#usr-tel').val(),
                    idline : $('#usr-line').val(),
                    email : $('#email').val(),
                    alamatban : $('#address').val(),
                    alamatasal : $('#address2').val(),
                    tgllahir : $('#bday').val(),
                    gerejaasal : $('#church').val(),
                    asalsekolah : $('#school').val(),
                    namaortuwali : $('#wali').val(),
                    hubortuwali : $('#relation').val(),
                    alamatortuwali : $('#wali-tel').val(),
                    nomorhportuwali : $('#wali-tel').val(),
                    secretcode : $('#group-code').val(),
                    image : base64Image}, 
                
                    function(data, status){
                        console.log("Data: ", data);
                        console.log("Status: ", status);
                    }
                );
            });
            showSnackbar("Sending data..");
            setTimeout(function () {
                showSnackbar("Data sent!");;
            }, 4000);
        }
        this.classList.add('was-validated');
    });

});





