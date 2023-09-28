import { TICKETDAO } from "../dao";

async function saveTicket(req,res){
    const ticket = req.body;
    const user = req.user;
    await TICKETDAO.save(user);
    res.send(ticket);
}

async function getAllTickets(req,res){
    const tickets = await TICKETDAO.getAll();
    res.send(tickets);
}

async function getTicketById(req,res){
    const tid = req.params.tid;
    const ticketId= await TICKETDAO.getById(tid);
    return ticketId
}

export {saveTicket, getAllTickets, getTicketById}