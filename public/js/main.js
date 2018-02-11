$(document).ready(function() {

    $('.deleteUser').on('click', deleteUser);

    function deleteUser() {
        var element = this;
        var confirmation = confirm('Are you sure?');
        var userId = element.getAttribute('data-id');

        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: '/users/delete/' + userId
            }).always(function(response) {
                window.location.replace('/');
            });
            
        } else {
            return false;
        }       
    }

});