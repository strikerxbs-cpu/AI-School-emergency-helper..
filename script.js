// বিভিন্ন ক্যাটাগরির ডেটাবেজ
const emergencyData = {
    fire: {
        title: "fire",
        text: "আগুনের ক্ষেত্রে করণীয়:\n১. শান্ত থাকুন ও দ্রুত অন্যদের জানান।\n২. সিঁড়ি দিয়ে দ্রুত বাইরে বেরিয়ে আসুন, লিফট ব্যবহার করবেন না।\n৩. ধোঁয়া থাকলে নিচু হয়ে বা হামাগুড়ি দিয়ে বের হন।"
    },
    accident: {
        title: "accident",
        text: "দুর্ঘটনা/আঘাত প্রাপ্তিতে করণীয়:\n১. ক্ষতস্থান পরিষ্কার কাপড় দিয়ে চেপে ধরুন।\n২. আহত ব্যক্তিকে নড়াচড়া করাবেন না।\n৩. দ্রুত বিদ্যালয়ের ফাস্ট এইড টিমকে খবর দিন।"
    },
    electric: {
        title: "electric",
        text: "বিদ্যুৎ শর্ট সার্কিট বা সমস্যায় করণীয়:\n১. বৈদ্যুতিক স্পার্ক বা তারের সংস্পর্শ থেকে দূরে থাকুন।\n২. ভেজা হাতে কোনো সুইচ বা সকেটে হাত দেবেন না।\n৩. কাউকে বিদ্যুতায়িত দেখলে খালি হাতে ধরবেন না, শুকনো কাঠ বা প্লাস্টিক দিয়ে আলাদা করুন।\n৪. দ্রুত স্কুলের মেইন সুইচ বন্ধ করার ব্যবস্থা করুন।"
    },
    storm: {
        title: "storm",
        text: "ঝড় বা পানি/বন্যা দেখা দিলে করণীয়:\n১. দ্রুত পাকা ভবনের ভেতরে অবস্থান নিন।\n২. জানালা ও দরজা শক্ত করে বন্ধ রাখুন।\n৩. গাছপালা, বৈদ্যুতিক খুঁটি বা ঝুঁকিপূর্ণ দেওয়ালের নিচে দাঁড়াবেন না।\n৪. শিক্ষকের নির্দেশ মেনে নিরাপদ স্থানে থাকুন।"
    }
};

// ক্যাটাগরি বাটন সিলেক্ট
function selectCategory(type) {
    if (emergencyData[type]) {
        document.getElementById("userInput").value = emergencyData[type].title;
        showInstructions(emergencyData[type].text);
    }
}

// ইনস্ট্রাকশন দেখানো
function showInstructions(text) {
    const resultBox = document.getElementById("resultBox");
    const instructionText = document.getElementById("instructionText");
    
    instructionText.innerText = text;
    resultBox.style.display = "block";
}

// ভয়েস ইনপুট
function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("ভয়েস ইনপুট সমর্থিত নয়।");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD';

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
        triggerSmartHelp();
    };

    recognition.start();
}

// স্মার্ট হেল্প বাটন
function triggerSmartHelp() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();
    
    if (input.includes("fire") || input.includes("আগুন")) {
        selectCategory('fire');
    } else if (input.includes("accident") || input.includes("আঘাত") || input.includes("দুর্ঘটনা")) {
        selectCategory('accident');
    } else if (input.includes("electric") || input.includes("বিদ্যুৎ")) {
        selectCategory('electric');
    } else if (input.includes("storm") || input.includes("ঝড়") || input.includes("বন্যা")) {
        selectCategory('storm');
    } else if (input !== "") {
        showInstructions(input + " সংক্রান্ত সমস্যায় শান্ত থাকুন, শিক্ষককে জানান এবং নিরাপদ স্থানে অবস্থান করুন।");
    } else {
        alert("অনুগ্রহ করে সমস্যা লিখুন বা ক্যাটাগরি নির্বাচন করুন।");
    }
}

// ভয়েস আউটপুট (App Inventor & Browser Compatible)
function speakInstructions() {
    const text = document.getElementById("instructionText").innerText;
    if (!text) return;

    // ১. অ্যাপ ইনভেন্টরের জন্য
    if (window.AppInventor) {
        window.AppInventor.setWebViewString(text);
    } 
    // ২. ব্রাউজারের জন্য
    else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bn-BD';
        window.speechSynthesis.speak(utterance);
    }
}
