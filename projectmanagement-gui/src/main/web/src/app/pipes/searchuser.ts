import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userSearchPipe', pure: false})
export class UserSearchPipe implements PipeTransform{
    transform(items: Array<any>, filterstring : string){
        if (items && items.length){
            return items.filter(item =>{
                if (filterstring === '' || filterstring === undefined || filterstring === null)
                {
                    return true;
                }else if (filterstring)
                {
                    if(item.firstName.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.lastName.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.employeeId.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                }else{
                    return false;
                }
                return false;
           })
        }
        else{
            return items;
        }
    }
}