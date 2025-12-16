function openNav() {
    document.getElementById("mySidebar").style.width = "50%";
    document.getElementById("main").style.marginLeft = "25%";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

const faqItems = document.querySelectorAll('.itemTitle');

faqItems.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            document.querySelectorAll('.itemAnswer').forEach(ans => ans.style.maxHeight = null);

            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});
