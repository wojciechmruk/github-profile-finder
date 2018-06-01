// jarodrejestracyjny
$(document).ready(function () {
    
    function updateRepos(repos){
    $.each(repos, function (index, repo) {
        $('#repositories').append(`
            <div class="card" id="repo_${index}" style="display: none;" >
             <div class="card-header">${repo.name}<br>
                 <div class="row">
                     <div class="col-md-7">                    
                         <p class="card-text">${repo.description}</p>
                     </div>
                     <div class="col-md-3">
                         <a href="#" class="badge badge-primary">Forks: ${repo.forks_count}</a>
                         <a href="#" class="badge badge-info">Watches: ${repo.watchers_count}</a>
                         <a href="#" class="badge badge-success">Stars: ${repo.stargazers_count}</a>
                     </div>
                     <div class="col-md-2">
                         <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
                     </div>
                 </div> <!-- row -->
            </div>
         </div>  <!-- card -->  
    `);                 
        $('#repo_'+index).slideDown('slow');                    
    });
    }
    
    function updateProfile(profile){
    $('#profile').html(`
        <div class="card">
            <div class="card-header">
                ${profile.name}
            </div>
            <div class="card-body">
                <h5 class="card-title"></h5>
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail" src="${profile.avatar_url}">
                        <a class="btn btn-primary btn-block" href="${profile.html_url}" target="_blank">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <a href="#" class="badge badge-primary">Public Repos: ${profile.public_repos}</a>
                        <a href="#" class="badge badge-info">Public Gists: ${profile.public_gists}</a>
                        <a href="#" class="badge badge-success">Followers: ${profile.followers}</a>
                        <a href="#" class="badge badge-danger">Following: ${profile.following}</a>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${profile.company}</li>
                            <li class="list-group-item">Website: ${profile.blog}</li>
                            <li class="list-group-item">Location: ${profile.location}</li>
                            <li class="list-group-item">Member at: ${profile.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
    }
    
    $('#search').on('keyup', function (e) {
        let username = e.target.value;
        $('#repositories').html('');
        // make ajax request
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '',
                client_secret: '',
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '',
                    client_secret: '',
                    sort: 'created: desc',
                    per_page: 10,

                }
            }).done(function (repos) {
                updateRepos(repos);
            }).fail(function(data){
                $('#profile').html(`
                    <div class="card">
                        <div class="card-header">
                            Too many requests. Try again later...
                        </div>
                    </div>
                `);
            });
                updateProfile(user)
        });
    })
});