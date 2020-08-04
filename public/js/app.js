const form = document.querySelector('form'),
    input = document.querySelector('input'),
    msg1 = document.getElementById('msg1'),
    msg2 = document.getElementById('msg2')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value
    msg1.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then(res => res.json().then(data => {
        if (data.error) {

            msg1.textContent = data.error
            msg2.textContent = ''
        } else {
            msg1.textContent = data.location
            msg2.textContent = data.description


        }


    }
    ))
})

