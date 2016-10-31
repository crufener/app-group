namespace group.Controllers {

    export class HomeController {
        public users;

        constructor(private userResource: group.Services.UserService) {
            this.users = userResource.getAll();
        }
    }

    export class UserController {
        public user;

        constructor(
            $stateParams: ng.ui.IStateParamsService,
            userResource: group.Services.UserService
        ) {
            this.user = userResource.getUserById($stateParams['id']);
        }
    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
