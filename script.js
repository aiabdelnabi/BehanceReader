
var app = angular.module("Breader", ['ngResource']);

app.factory('behanceData', function($resource){

	return {
		fetchPopular: function(creativeField,callback){

			var Url = 'https://www.behance.net/v2/projects?api_key=:client_id&callback=JSON_CALLBACK';
			if(creativeField != ''){
				Url += '&field=' + creativeField;
			}

			var api = $resource(Url,{
				client_id: 'grGmzhOr0phh29cHHGLHhgoh4tz7JNyg'
			},{
				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){
				callback(response);
			});
		}
	}

});

function HomePageController($scope, behanceData){

	$scope.SelectedCategory = 'web+design';

	$scope.pics = [];

	$scope.CurrentPage = 1;


	behanceData.fetchPopular('',function(data){$scope.pics = data.projects;});

	$scope.LoadData =function(){
		behanceData.fetchPopular($scope.SelectedCategory,function(data){
			$scope.pics =  data.projects;
		});
	}
}