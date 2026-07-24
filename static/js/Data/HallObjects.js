import {CurrentLocalEnvironment} from '../edithall.js'

class Property{
    constructor(name,value,{
        editable = true,
        type = 'string',
    } = {}){
        this.name = name;
        this.value = value;
        this.editable = editable;
        this.type = type
    }
    SetValue(newvalue){
        try{
            if (!this.editable) {
                throw new Error(`Error: Property \'${this.name}\' can\'t be changed`)
            }
            else{
                this.value = newvalue
            }
        }
        catch(error){
            console.log(error.message)
        }
    }
    GetValue(){
        return this.value
    }
}

export class Hall{
    constructor(hallid,name){
        this.HallId = new Property('HallId',hallid,{
            editable : false,
            type : 'number',
        });
        this.SelfLocalEnvironment = new Property('SelfLocalEnvironment',document.getElementById('hall'),{
            editable : false,
            type : 'object'
        });
        this.Name = new Property('Name',name,{
            editable : false,
        });
        this.Seats = new Property('Seats',{},{
            editable : false,
            type : 'object',
        });
        this.Zones = new Property('Zones',{},{
            editable : false,
            type : 'object',
        });
    }
    AddSeat(seat){
        this.Seats[seat.Id.GetValue()] = seat;
    }
    AddZone(zone){
        this.Zones[zone.Id.GetValue()] = zone;
    }
}

export class HallObject {
    constructor(locenv,name){
        this.Id = new Property('Id',crypto.randomUUID(),{
            editable : false
        });
        this.LocalEnvironment = new Property('LocalEnvironment',locenv,{
            editable : true,
            type : 'object'
        })
        this.Name = new Property('Name',name);;
    }
}

export class Zone extends HallObject{
    constructor(locenv,x,y) {
        super('Zone');
        this.LocalEnvironment = new Property('LocalEnvironment',locenv,{
            editable : true,
            type : 'object'
        });
        this.x = new Property('x',x,{
            type : 'number'
        });
        this.y = new Property('y',y,{
            type : 'number'
        });;

        this.Seats = new Property('Seats', {}, {
            editable : false,
            type : 'object'
        });
        this.Zones = new Property('Zones', {}, {
            editable : false,
            type : 'object'
        });

        this.CreateVisObj();
    }

    CreateSelfLocalEnvironment() {
        const SLE = document.createElement('div');
        SLE.style.backgroundColor = 'white';
        SLE.style.width = '100%';
        SLE.style.height = '100%';
        CurrentLocalEnvironment.append(SLE);
    }

    CreateVisObj() {
        const hall = document.getElementById("hall");

        this.VisObj = new Property('VisObj', document.createElement("div"), {
            editable : false,
            type : 'object'
        }) ;

        this.VisObj.value.style.position = "absolute";
        this.VisObj.value.style.width = "5%";
        this.VisObj.value.style.height = "5%";
        this.VisObj.value.style.backgroundColor = "Green";
        this.VisObj.value.textContent = "Zone";
        this.VisObj.value.setAttribute('Id',this.Id.GetValue());
        
        this.VisObj.value.classList.add('Object');

        this.SetPosition(this.x.GetValue(), this.y.GetValue());

        hall.append(this.VisObj.GetValue());
    }

    SetPosition(x, y) {
        this.x.SetValue(x);
        this.y.SetValue(y);

        this.VisObj.value.style.left = `${x}%`;
        this.VisObj.value.style.top = `${y}%`;
    }

    SetLocalEnvironment(locenv){
        this.LocalEnvironment.SetValue(locenv);
    }

    AddSeat(seat){
        this.Seats[seat.Id.GetValue()] = seat;
        seat.SetZone(this)
    }

    AddZone(zone){
        this.Zones[zone.Id.GetValue()] = zone;
    }
}

export class Seat extends HallObject{
    constructor(locenv,x, y) {
        super('Seat');
        this.LocalEnvironment = new Property('LocalEnvironment',locenv,{
            editable : true,
            type : 'object'
        });
        this.x = new Property('x',x,{
            type : 'number'
        });
        this.y = new Property('y',y,{
            type : 'number'
        });

        this.CreateVisObj();
    }

    CreateVisObj() {
        const hall = document.getElementById("hall");

        this.VisObj = document.createElement("div");

        this.VisObj.value.style.position = "absolute";
        this.VisObj.value.style.width = "1%";
        this.VisObj.value.style.height = "1%";
        this.VisObj.value.style.backgroundColor = "red";
        this.VisObj.value.textContent = "Seat";
        this.VisObj.value.setAttribute('Id',this.Id.GetValue());

        this.VisObj.value.classList.add('Object');

        this.SetPosition(this.x.GetValue(), this.y.GetValue());

        hall.append(this.VisObj.GetValue());
    }

    SetPosition(x, y) {
        this.x.SetValue(x);
        this.y.SetValue(y);

        this.VisObj.value.style.left = `${x}%`;
        this.VisObj.value.style.top = `${y}%`;
    }

    SetLocalEnvironment(locenv){
        this.LocalEnvironment.SetValue(locenv);
    }
}