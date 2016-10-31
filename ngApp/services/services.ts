namespace group.Services {
    export class UserService {
        public userResource;

        public getAll() {
            return this.userResource.query();
        }

        public getUserById(id) {
            return this.userResource.get({id: id});
        }

        constructor($resource: ng.resource.IResourceService) {
            this.userResource = $resource('/login/:id');
        }
    }
    angular.module('group').service('userService', UserService);
    }
