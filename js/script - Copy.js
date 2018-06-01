// jarodrejestracyjny
$(document).ready(function(){
	$('#searchUser').on('keyup',function(e){
		let username = e.target.value;

		// make ajax request
		$.ajax({
			url: 'https://api.github.com/users/'+username,
			data:{
				client_id: 'Iv1.707369f1be7c11a3',
				client_secret: '19d903a6744a90521931ddee83f3af09ee009716',				
			}
		}).done(function (user){
			$.ajax({
				url: 'https://api.github.com/users/'+username+'/repos',
				data:{
					client_id: 'Iv1.707369f1be7c11a3',
					client_secret: '19d903a6744a90521931ddee83f3af09ee009716',				
				}
			}).done(function(repos){});
			$('#profile').html(`
				
				<div class="card">
				  <div class="card-header">
				    ${user.name}
				  </div>
				  <div class="card-body">
				    <h5 class="card-title"></h5>
				    <div class="row">
				    	<div class="col">
				    		<img class="thumbnail" src="${user.avatar_url}">
				    		<a class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
				    	</div>
				    	<div class="col">
							<a href="#" class="badge badge-primary">Public Repos: ${user.public_repos}</a>
							<a href="#" class="badge badge-secondary">Public Gists: ${user.public_gists}</a>
							<a href="#" class="badge badge-success">Followers: ${user.followers}</a>
							<a href="#" class="badge badge-danger">Following: ${user.following}</a>
							<br><br>
							<ul class="list-group">
							  <li class="list-group-item">Company: ${user.company}</li>
							  <li class="list-group-item">Website: ${user.blog}</li>
							  <li class="list-group-item">Location: ${user.location}</li>
							  <li class="list-group-item">Member at: ${user.created_at}</li>
							</ul>
				    	</div>
				    	<div class="col"></div>
				    </div>

				  </div>
				</div>
				<h3 class="page-header"> Latest Repo</h3>
				<div id="repos"></div>
				`);
			
		});
	})
});