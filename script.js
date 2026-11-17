(() => {
  const screens = ["welcome","punishment","slap","jail","feelings","apology","verdict","message"];
  const progress = {welcome:8,punishment:22,slap:40,jail:40,feelings:60,apology:80,verdict:92,message:100};
  const labels = {welcome:"THE COURT IS NOW IN SESSION",punishment:"CHAPTER 01 · SENTENCING",slap:"CHAPTER 02 · DIGITAL JUSTICE",jail:"CHAPTER 02 · CONFINEMENT",feelings:"CHAPTER 03 · THE JUDGE SPEAKS",apology:"CHAPTER 04 · STATEMENT OF THE ACCUSED",verdict:"CHAPTER 05 · FINAL VERDICT",message:"A LITTLE SPACE FOR YOUR MESSAGE"};
  let slapCount = 0;
  let selectedFeeling = "";
  let selectedPunishment = "";
  const $ = (id) => document.getElementById(id);

  function showScreen(name) {
    if (!screens.includes(name)) return;
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $("screen-" + name).classList.add("active");
    $("progressBar").style.width = progress[name] + "%";
    $("progressLabel").textContent = labels[name];
    window.scrollTo({top:0,behavior:"smooth"});
  }
  document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.next)));
  document.querySelectorAll("[data-back]").forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.back)));

  document.querySelectorAll("[data-punishment]").forEach(btn => btn.addEventListener("click", () => {
    selectedPunishment = btn.dataset.punishment;
    try { localStorage.setItem("manaao_punishment", selectedPunishment); } catch (_) {}
    showScreen(btn.dataset.next);
  }));

  $("slapButton").addEventListener("click", () => {
    const stage = $("slapStage");
    stage.classList.remove("hit");
    void stage.offsetWidth;
    stage.classList.add("hit");
    slapCount += 1;
    $("slapCount").textContent = slapCount;
    $("slapCaption").textContent = ["Objection overruled. 💥","The accused has been humbled.","A devastating legal argument.","Biki.exe has stopped responding."][Math.min(slapCount - 1,3)];
    $("avatar").querySelector(".avatar-face").textContent = ["😵‍💫","🥴","😳","🫠"][Math.min(slapCount - 1,3)];
    if (navigator.vibrate) navigator.vibrate(45);
    window.setTimeout(() => stage.classList.remove("hit"), 650);
  });

  const acknowledgements = {
    angry:"I hear you. I won't tell you not to be angry. ❤️",
    hurt:"I'm sorry it hurt. I want to understand, not minimise it. ❤️",
    ignored:"You deserved to feel heard. I want to do better. ❤️",
    space:"Of course. Take the time you need; I won't pressure you. 🌿",
    listen:"I'll listen without interrupting or trying to win the argument. ❤️"
  };
  document.querySelectorAll("[data-feeling]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-feeling]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedFeeling = btn.dataset.feeling;
    $("feelingAcknowledgement").textContent = acknowledgements[selectedFeeling];
    try { localStorage.setItem("manaao_feeling", selectedFeeling); } catch (_) {}
  }));

  const verdicts = {
    forgiven:"The court grants conditional forgiveness. The accused is sentenced to consistency, kindness, and hugs — whenever the judge wants them. ❤️",
    try:"The court has requested further evidence through actions, not just words. The accused accepts responsibility and will keep trying.",
    space:"The court is adjourned. No pressure, no countdown, no repeated messages. Take the time you need. 🌙",
    hug:"The court recommends one very warm hug, only if both parties want it. 🫂"
  };
  document.querySelectorAll("[data-verdict]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-verdict]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    const result = $("verdictResult");
    result.hidden = false;
    result.textContent = verdicts[btn.dataset.verdict];
    try { localStorage.setItem("manaao_verdict", btn.dataset.verdict); } catch (_) {}
    openKissModal();
  }));


  let kisses = 0;
  const kissModal = $("kissModal");
  function openKissModal() {
    kisses = 0;
    $("kissCount").textContent = "0";
    $("kissMessage").textContent = "No pressure, Your Honour. The court respects your decision.";
    kissModal.hidden = false;
    document.body.classList.add("modal-open");
  }
  function closeKissModal() {
    kissModal.hidden = true;
    document.body.classList.remove("modal-open");
  }
  $("kissButton").addEventListener("click", () => {
    if (kisses >= 10) return;
    kisses += 1;
    $("kissCount").textContent = kisses;
    $("kissMessage").textContent = kisses === 10
      ? "ORDER COMPLETED! The accused sends 10 virtual kisses right back. 💋❤️"
      : ["A kiss for the idiot. 💋","The court approves. ❤️","The accused is smiling already. 🥰"][kisses % 3];
    if (navigator.vibrate) navigator.vibrate(20);
    if (kisses === 10) $("kissButton").textContent = "10 kisses delivered! ❤️";
  });
  $("kissLaterButton").addEventListener("click", closeKissModal);
  kissModal.addEventListener("click", (event) => {
    if (event.target === kissModal) closeKissModal();
  });

  function getMessageText() {
    return $("herMessage").value.trim();
  }
  function buildShareText() {
    const message = getMessageText();
    return `A message for Biki ❤️\n\n${message}`;
  }
  function requireMessage() {
    const message = getMessageText();
    if (!message) {
      $("shareStatus").textContent = "Write your message first. Biki wants to hear what's on your mind. ❤️";
      $("herMessage").focus();
      return false;
    }
    $("shareStatus").textContent = "";
    return true;
  }

  $("shareButton").addEventListener("click", async () => {
    if (!requireMessage()) return;
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({title: "A message for Biki ❤️", text});
        $("shareStatus").textContent = "Share menu opened. Choose Biki in your preferred app. ❤️";
      } catch (error) {
        if (error && error.name !== "AbortError") {
          $("shareStatus").textContent = "Couldn't open the share menu. You can use WhatsApp or Copy message below.";
        }
      }
    } else {
      $("shareStatus").textContent = "Your browser doesn't support the share menu. Use WhatsApp or Copy message below.";
    }
  });

  $("whatsappButton").addEventListener("click", () => {
    if (!requireMessage()) return;
    const url = "https://wa.me/?text=" + encodeURIComponent(buildShareText());
    window.open(url, "_blank", "noopener,noreferrer");
    $("shareStatus").textContent = "WhatsApp is opening. Choose Biki's chat and send your message. 💚";
  });

  $("copyMessageButton").addEventListener("click", async () => {
    if (!requireMessage()) return;
    const text = buildShareText();
    try {
      await navigator.clipboard.writeText(text);
      $("shareStatus").textContent = "Message copied. Paste it into WhatsApp or any chat with Biki. ❤️";
    } catch (_) {
      $("herMessage").select();
      $("shareStatus").textContent = "Select and copy your message, then paste it into a chat with Biki.";
    }
  });

  $("restartButton").addEventListener("click", () => {
    slapCount = 0; selectedFeeling = ""; selectedPunishment = "";
    $("slapCount").textContent = "0";
    $("avatar").querySelector(".avatar-face").textContent = "😵‍💫";
    $("slapCaption").textContent = "Awaiting the judge's decision…";
    $("feelingAcknowledgement").textContent = "";
    $("verdictResult").hidden = true;
    $("herMessage").value = "";
    $("shareStatus").textContent = "";
    closeKissModal();
    $("kissButton").textContent = "Give a kiss 💋";
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    showScreen("welcome");
  });
  showScreen("welcome");
})();