const socket = io()


socket.emit("connection","New client")

let user;

Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
      user = result.value.login
    }
})

let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        let message = chatBox.value
        let messageContainer = document.getElementById('messageContainer')
        let div = document.createElement('div')
        div.innerHTML = ` 
        <div>
        <p><b>${user}</b></p>
        <p>${message}</p>
        </div>
        `
        socket.emit("save-message",{user: user, message: message})
        messageContainer.append(div)
        chatBox.value = ""
    }
})

socket.on("send-messages",(data)=>{
    let containerMessages = document.getElementById('containerMessages')
    containerMessages.innerHTML = ""
    data.forEach((message)=>{
        let div = document.createElement('div')
        div.innerHTML =  ` 
        <div>
        <p><b>${message.user}</b></p>
        <p>${message.message}</p>
        </div>
        `
        containerMessages.append(div)
    })
    socket.emit("New-messages",data.length)
})