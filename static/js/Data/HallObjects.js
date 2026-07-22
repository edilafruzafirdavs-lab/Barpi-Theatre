export class Hall{
    constructor(hallid,name){
        this.HallId = hallid;
        this.Name = name;
        this.Seats = [];
        this.Zones = [];
    }
    AddSeat(seat){
        this.Seats.push(seat);
    }
    AddZone(zone){
        this.Zones.push(zone);
    }
}

export class HallObject {
    constructor(name){
        this.Id = crypto.randomUUID();
        this.Name = name;
    }
}

export class Zone extends HallObject{
    constructor(x,y) {
        super('Zone');
        this.x = x;
        this.y = y;

        this.Seats = [];

        this.CreateVisObj();
    }

    CreateVisObj() {
        const hall = document.getElementById("hall");

        this.ZoneVisObj = document.createElement("div");

        this.ZoneVisObj.style.position = "absolute";
        this.ZoneVisObj.style.width = "5%";
        this.ZoneVisObj.style.height = "5%";
        this.ZoneVisObj.style.backgroundColor = "Green";
        this.ZoneVisObj.textContent = "Zone";
        
        this.ZoneVisObj.classList.add('Object');

        this.SetPosition(this.x, this.y);

        hall.append(this.ZoneVisObj);
    }

    SetPosition(x, y) {
        this.x = x;
        this.y = y;

        this.ZoneVisObj.style.left = `${x}%`;
        this.ZoneVisObj.style.top = `${y}%`;
    }

    AddSeat(seat){
        this.Seats.push(seat);
        seat.SetZone(this);
    }
}

export class Seat extends HallObject{
    constructor(x, y) {
        super('Seat');
        this.x = x;
        this.y = y;

        this.CreateVisObj();
    }

    CreateVisObj() {
        const hall = document.getElementById("hall");

        this.SeatVisObj = document.createElement("div");

        this.SeatVisObj.style.position = "absolute";
        this.SeatVisObj.style.width = "1%";
        this.SeatVisObj.style.height = "1%";
        this.SeatVisObj.style.backgroundColor = "red";
        this.SeatVisObj.textContent = "Seat";

        this.SeatVisObj.classList.add('Object');

        this.SetPosition(this.x, this.y);

        hall.append(this.SeatVisObj);
    }

    SetPosition(x, y) {
        this.x = x;
        this.y = y;

        this.SeatVisObj.style.left = `${x}%`;
        this.SeatVisObj.style.top = `${y}%`;
    }

    SetZone(zone){
        this.Zone = zone;
    }
}