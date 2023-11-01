import ticketModel from "../mongo/models/ticket.model.js";

export default class TicketDao{
    constructor(){
        console.log(`Working in MongoDB`);
    }

    save = async(data) =>{
        const newTicket = await ticketModel.create(data);
        return newTicket;
    }

    getAll = async () =>{
        const result = ticketModel.find({}).lean();
        return result;
    }

    getById = async (tid) =>{
        let idTicket = await ticketModel.findById({_id:tid});
        return idTicket;
    }

    getByEmail = async (email) =>{
        let ticket = await ticketModel.findOne({purchaser: email});
        return ticket;
    }

    update = async (tid,data) =>{
        const ticketUpdated = await ticketModel.findByIdAndUpdate(tid,data, {new: true});
        return ticketUpdated;
    }

    delete = async(tid) =>{
        const ticketDeleted = await ticketModel.findByIdAndDelete(tid);
        return ticketDeleted;
    }
}