import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'projectSearchPipe', pure: false})
export class ProjectSearchPipe implements PipeTransform{
    transform(items: Array<any>, filterstring : string){
        if (items && items.length){
            return items.filter(item =>{
                if (filterstring === '' || filterstring === undefined || filterstring === null)
                {
                    return true;
                }else if (filterstring)
                {
                    if(item.projectName.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.startDate.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.endDate.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.priority.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.status.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
                        return true;
                    }
                    if(item.managerId.toLowerCase().indexOf(filterstring.toLowerCase()) > -1){
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