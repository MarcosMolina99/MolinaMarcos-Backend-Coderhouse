import ticketmodel from "../dao/mongo/models/ticket.model.js";

export default class TicketDao{
    async getAll(){
        let tickets = await ticketmodel.find({}).lean();
        return tickets;
    }

    async getById(tid){
        let idTicket= await ticketmodel.findById(tid);
        return idTicket;
    }

    async update(tid,data){
        const updateTicket = await ticketmodel.findByIdAndUpdate(tid,data, {new:true});
        return updateTicket;
    }
    
    async save(data){
        const newTicket = await ticketmodel.create(data);
        return newTicket;
    }

    async delete(tid){
        const deleteTicket = await ticketmodel.findByIdAndDelete(tid);
        return deleteTicket;
    }
}