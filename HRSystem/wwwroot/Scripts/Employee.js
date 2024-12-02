

$(document).ready(function () {
    loadData();
});
// Load Data function
function loadData() {
    $.ajax({
        url: '/Employees/GetAll',
        type: 'GET',
        success: function (result) {
            //var html = '';
            //$.each(result.data, function (key, item) {

            //});

            //$('.tbody').html(html);
            document.getElementById("list").innerHTML = result.view;
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}
//<div class="dropdown no-arrow">
//    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
//        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//        <i class="fas fa-ellipsis-v fa-sm fa-fw text-black-400"></i>
//    </a>
//    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//        aria-labelledby="dropdownMenuLink">
//        <a class="dropdown-item" href="#" class="btn btn-primary" onclick="return getbyID(' + item.Id + ')">Edit</a>
//        <a class="dropdown-item" href="#">Details</a>
//        <div class="dropdown-divider"></div>
//        <a class="dropdown-item" class="btn btn-danger" onclick="ConfirmDelete(' + item.Id + ')" href="#">Delete</a>
//    </div>
//</div>
/*
 <td>@item.name</td>
                                <td>@item.position</td>
                                <td>@item.Department</td>
                                <td>@item.Age</td>
                               @* <td>@item.Dept_no</td>*@
                                <td>@item.salary</td>
*/
// Add Employee Data Function
function Add() {
    //var employee = {
    //   // EmployeeID: $('#Id').val(),
    //    Name: $('#name').val(),
    //    Salary: $('#salary').val(),
    //    Department: $('#Department').val()
    //};
    $.ajax({
        url: '/Employees/AddEmployee',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (result) {
          //  loadData();
            $('#myModal').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
$('#btn-add').on('click', function () {
    $('#AddModal').modal('show');
})
// Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Employees/GetById/" + EmpID,
        type: "GET",
        contentType: 'application/json',
        success: function (result) {
            $('#Id').val(result.data.Id);
            $('#Name').val(result.data.Name);
            $('#Salary').val(result.data.Salary);
            $('#Department').val(result.data.Department);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#myModalLabelAddEmployee').hide();
            $('#myModalLabelUpdateEmployee').show();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
// Function for updating employee's record
function Update() {
    var employee = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Salary: $('#Salary').val(),
        Department: $('#Department').val(),
    };
    $.ajax({
        url: '@Url.Action("UpdateEmployee", "Employees")',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Salary').val("");
            $('#Department').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for showing the Popup before deletion
function ConfirmDelete(EmpID) {
    $.ajax({
        url: "/Employees/GetById/" + EmpID,
        type: "GET",
        contentType: 'application/json',
        success: function (result) {
            $("#labelToUpdateName").html("<b>Name: </b>" + result.data.Name);
            $("#labelToUpdateDepartment").html("<b>Department: </b>" + result.data.Department);
            $("#labelToUpdateSalary").html("<b>Salary: </b>" + result.data.Salary);
            $('#HiddenEmployeeId').val(EmpID);
            $('#deleteConfirmationModal').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for deleting the Employee
function Delete() {
    var ID = $('#HiddenEmployeeId').val();
    $.ajax({
        url: "/Employees/DeleteEmployee/" + ID,
        type: 'POST',
        contentType: 'application/json',
        success: function (result) {
            loadData();
            $('#deleteConfirmationModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
// Function for clearing the textboxes
function clearTextBox() {
    $('#Id').val("");
    $('#Name').val("");
    $('#Salary').val("");
    $('#Department').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
    $('#Department').css('border-color', 'lightgrey');
}

//function AddEmployee() {
//    $.ajax({
//        url: 'Employees/AddEmployee',
//        success: function () {

//        }
//    })
//}
//function newTask() {

//    var myModal = $('#myModal');
//    $.get('/Cloud_Customer_Events/Create/' + id, function (data) {
//        $('#mydiv2').html(data);
//        $('#myModal .modal-header .modal-title').html('Create Record');
//        $('#myModal').appendTo("body").modal('show');
//    });

//}
function newTask() {

    var myModal = $('#myModal');
    $.get('/Employees/Create/' , function (data) {
      //  $('#mydiv2').html(data);
        $('#myModal .modal-header .modal-title').html('Create Record');
        $('#myModal').appendTo("body").modal('show');
    });

}