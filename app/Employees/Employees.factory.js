app.factory("EmployeesFactory", function($http){
 
    var baseUrl = 'http://localhost:3577';
    var factory = {};
 
    // read all Employees
    factory.readEmployees = function(){
        return $http({
            method: 'GET',            
            url: baseUrl + '/api/Employee'
        });
    };
     


// create Employee
factory.createEmployee = function($scope){
    return $http({
        method: 'POST',
        data: {            
            "FirstName" : $scope.FirstName ,
            "LastName" : $scope.LastName ,
            "Address" : $scope.Address ,
            "Email" : $scope.Email ,
            "PhoneNumber" : $scope.PhoneNumber,
            "DepartmentId" : $scope.DepartmentId,
        },
        'Content-Type': 'application/json',
        url: baseUrl + '/api/Employee/'
    });
};
 
// readOneEmployee will be here

// read one Employee
factory.readOneEmployee = function(id){
    return $http({
        method: 'GET',
        url: baseUrl + '/api/Employee/' + id
    });
};
 
// updateEmployee will be here

// update Employee
factory.updateEmployee = function($scope){ 
    return $http({
        method: 'PUT',       
        data: {  
            "EmployeeID":$scope.id,         
            "FirstName" : $scope.FirstName ,
            "LastName" : $scope.LastName ,
            "Address" : $scope.Address ,
            "Email" : $scope.Email ,
            "PhoneNumber" : $scope.PhoneNumber,
            "DepartmentId" : $scope.DepartmentId,
        },
        'Content-Type': 'application/json',
        url: baseUrl + '/api/Employee/'+ $scope.id
    });
};
 
// deleteEmployee will be here
// delete Employee
factory.deleteEmployee = function(id){
    return $http({
        method: 'DELETE',            
        //data: { 'id' : id },
        url: baseUrl + '/api/Employee/'+ id ,   
       data: {
        'id' : id 
        },
    headers: {
        'Content-type': 'application/json;charset=utf-8'
    }       
    });  
};
 
// searchEmployees will be here

// search all Employees
factory.searchEmployees = function(keywords){
    return $http({
        method: 'GET',
        //url: baseUrl + '/api/Employee/search.php?s=' + keywords
        url: baseUrl + '/api/Employee/' + keywords
    });
};
     
    return factory;
});
