app.controller('EmployeesController', function($scope, $mdDialog, $mdToast, EmployeesFactory){
 
    // read Employees
    $scope.readEmployees = function(){
 
        // use Employees factory
        EmployeesFactory.readEmployees().then(function successCallback(response){
            debugger;
            $scope.Employees = response.data.Employees;
            $scope.Departments = response.data.Departments;

        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
 
    }
     
    // show 'create Employee form' in dialog box
$scope.showCreateEmployeeForm = function(event){
 
    $mdDialog.show({
        controller: DialogController,
        templateUrl: './app/Employees/create_Employee.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
}
 

// methods for dialog box
function DialogController($scope, $mdDialog) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

// create new Employee
$scope.createEmployee = function(){
 
    EmployeesFactory.createEmployee($scope).then(function successCallback(response){
 
        // tell the user new Employee was created
        $scope.showToast(response.data.message);
 
        // refresh the list
        $scope.readEmployees();
 
        // close dialog
        $scope.cancel();
 
        // remove form values
        $scope.clearEmployeeForm();
 
    }, function errorCallback(response){
        $scope.showToast("Unable to create record.");
    });
}
 

 // clear variable / form values
$scope.clearEmployeeForm = function(){

    $scope.id = "";        
    $scope.FirstName = "";        
    $scope.LastName = "";
    $scope.Address = "";
    $scope.Email = "";
    $scope.PhoneNumber = "";
    $scope.DepartmentId = "";
}

// show toast message
$scope.showToast = function(message){
    $mdToast.show(
        $mdToast.simple()
            .textContent(message)
            .hideDelay(3000)
            .position("top right")
    );
}



// readOneEmployee will be here

// retrieve record to fill out the form
$scope.readOneEmployee = function(id){
 
    // get Employee to be edited
    EmployeesFactory.readOneEmployee(id).then(function successCallback(response){
 
        // put the values in form
        $scope.id = response.data.EmployeeID;        
        $scope.FirstName = response.data.FirstName;        
        $scope.LastName = response.data.LastName;
        $scope.Address = response.data.Address;
        $scope.Email = response.data.Email;
        $scope.PhoneNumber = response.data.PhoneNumber;
        $scope.DepartmentId = response.data.DepartmentId;
               
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/Employees/read_one_Employee.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearEmployeeForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}
 

// showUpdateEmployeeForm will be here
 // retrieve record to fill out the form
$scope.showUpdateEmployeeForm = function(id){
 
    // get Employee to be edited
    EmployeesFactory.readOneEmployee(id).then(function successCallback(response){
 
        // put the values in form       
        $scope.id = response.data.EmployeeID;        
        $scope.FirstName = response.data.FirstName;        
        $scope.LastName = response.data.LastName;
        $scope.Address = response.data.Address;
        $scope.Email = response.data.Email;
        $scope.PhoneNumber = response.data.PhoneNumber;
        $scope.DepartmentId = response.data.DepartmentId;
 
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/Employees/update_Employee.template.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearEmployeeForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}
 
// updateEmployee will be here
// update Employee record / save changes
$scope.updateEmployee = function(){
 
    EmployeesFactory.updateEmployee($scope).then(function successCallback(response){
 
        // tell the user Employee record was updated
        $scope.showToast(response.data.message);
 
        // refresh the Employee list
        $scope.readEmployees();
 
        // close dialog
        $scope.cancel();
 
        // clear modal content
        $scope.clearEmployeeForm();
 
    },
    function errorCallback(response) {
        $scope.showToast("Unable to update record.");
    });
 
}
 
// confirmDeleteEmployee will be here

// cofirm Employee deletion
$scope.confirmDeleteEmployee = function(event, id){
 
    // set id of record to delete
    $scope.id = id;
 
    // dialog settings
    var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('Employee will be deleted.')
        .targetEvent(event)
        .ok('Yes')
        .cancel('No');
 
    // show dialog
    $mdDialog.show(confirm).then(
        // 'Yes' button
        function() {
            // if user clicked 'Yes', delete Employee record
            $scope.deleteEmployee();
        },
 
        // 'No' button
        function() {
            // hide dialog
        }
    );
}


// delete Employee
$scope.deleteEmployee = function(){
 
    EmployeesFactory.deleteEmployee($scope.id).then(function successCallback(response){
 
        // tell the user Employee was deleted
        $scope.showToast(response.data.message);
 
        // refresh the list
        $scope.readEmployees();
 
    }, function errorCallback(response){
        $scope.showToast("Unable to delete record.");
    });
 
}
 
// searchEmployees will be here
// search Employees
$scope.searchEmployees = function(){

   
 
    // use Employees factory
    EmployeesFactory.searchEmployees($scope.Employee_search_keywords).then(function successCallback(response){
        $scope.Employees = response.data.records;
    }, function errorCallback(response){
        $scope.showToast("Unable to read record.");
    });
}


});