function sendGetRequest(uri, onComplete) {
    $.ajax(url + uri, {
        method: 'GET',
        async: true,
        success: onComplete
    });
}

function sendPostRequest(uri, body, onComplete) {
    $.ajax(url + uri, {
        processData: false,
        contentType: false,
        method: 'POST',
        data: body,
        async: true,
        success: onComplete
    });
}

function getPopup(uri, oncomplete) {
    sendGetRequest(uri, function (e) {
        document.querySelector('#popupDiv').innerHTML = e;

        $("#default").modal('show');

        try {
            $('.select2').each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>');
                $this.select2({
                    dropdownAutoWidth: true,
                    width: '100%',
                    dropdownParent: $this.parent()
                });
            });
        } catch (e) {

        }

        if (oncomplete) {
            oncomplete(e);
        }
    });
}
function emptyForm(frmId) {
    let form = [...document.querySelector(`#${frmId}`)];
    form.forEach(i => {
        if (i.type != 'hidden') {
            i.value = '';
        }
    });
}

function DismissPopup() {
    $("#default").modal('hide');

    setTimeout(function () { $('#popupDiv').html(''); }, 1000);
}

function showLoader(btnId, LoaderbtnId) {
    document.querySelector("#" + btnId).style.display = "none";
    document.querySelector("#" + LoaderbtnId).style.display = "block";
}

function hideLoader(btnId, LoaderbtnId) {

    document.querySelector("#" + btnId).style.display = "block";
    document.querySelector("#" + LoaderbtnId).style.display = "none";
}
function GetBoobkName(event) {
    id = event.target.value;
    document.getElementById("ItemName").value = id;
    $('.select2').each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this.select2({
            dropdownAutoWidth: true,
            width: '100%',
            dropdownParent: $this.parent()
        });
    });


}
function GetBoobkCode(event) {
    id = event.target.value;
    document.getElementById("ItemsID").value = id;
    $('.select2').each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this.select2({
            dropdownAutoWidth: true,
            width: '100%',
            dropdownParent: $this.parent()
        });
    });


}

    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });





//const passwordInput = document.getElementById('password');
//const eyeIcon = document.getElementById('eye-icon');

//eyeIcon.addEventListener('click', () => {
//    if (passwordInput.type === 'password') {
//        passwordInput.type = 'text';
//        eyeIcon.classList.add('fa-eye-slash');
//        eyeIcon.classList.remove('fa-eye');
//    } else {
//        passwordInput.type = 'password';
//        eyeIcon.classList.add('fa-eye');
//        eyeIcon.classList.remove('fa-eye-slash');
//    }
//});

//$(".toggle-password2").click(function () {

//    $(this).toggleClass("fa-eye fa-eye-slash");
//    var input = $($(this).attr("toggle"));
//    if (input.attr("type") == "password") {
//        input.attr("type", "text");
//    } else {
//        input.attr("type", "password");
//    }
//});
