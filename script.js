/* =========================================================================
   NATIONAL ID SYSTEM - ALL 5 ENTERPRISE UPGRADES (script.js)
   ========================================================================= */
(function initAllFiveUpgrades() {
   const FB_CITIZENS_URL   = "https://nida-system-sixbeth-default-rtdb.firebaseio.com/citizens.json";

  // 1. TANZANIA 31 REGIONS -> DISTRICTS DIRECTORY
  const TZ_DISTRICTS = {
    "Arusha": ["Arusha City", "Arusha DC", "Karatu", "Longido", "Meru", "Monduli", "Ngorongoro"],
    "Dar es Salaam": ["Ilala", "Kinondoni", "Temeke", "Ubungo", "Kigamboni"],
    "Dodoma": ["Dodoma City", "Bahi", "Chamwino", "Chemba", "Kondoa", "Kongwa", "Mpwapwa"],
    "Geita": ["Bukombe", "Chato", "Geita Town", "Geita DC", "Mbogwe", "Nyang'hwale"],
    "Iringa": ["Iringa Municipal", "Iringa DC", "Kilolo", "Mafinga Town", "Mufindi"],
    "Kagera": ["Biharamulo", "Bukoba Municipal", "Bukoba DC", "Karagwe", "Kyerwa", "Missenyi", "Muleba", "Ngara"],
    "Katavi": ["Mlele", "Mpanda Municipal", "Mpanda DC", "Tanganyika"],
    "Kigoma": ["Buhigwe", "Kakonko", "Kasulu Town", "Kasulu DC", "Kibondo", "Kigoma Ujiji", "Uvinza"],
    "Kilimanjaro": ["Hai", "Moshi Municipal", "Moshi DC", "Mwanga", "Rombo", "Same", "Siha"],
    "Lindi": ["Kilwa", "Lindi Municipal", "Liwale", "Nachingwea", "Ruangwa", "Mtama"],
    "Manyara": ["Babati Town", "Babati DC", "Hanang", "Kiteto", "Mbulu", "Simanjiro"],
    "Mara": ["Bunda", "Butiama", "Musoma Municipal", "Musoma DC", "Rorya", "Serengeti", "Tarime"],
    "Mbeya": ["Busokelo", "Chunya", "Kyela", "Mbarali", "Mbeya City", "Mbeya DC", "Rungwe"],
    "Mjini Magharibi": ["Magharibi A", "Magharibi B", "Mjini"],
    "Morogoro": ["Gairo", "Kilombero", "Kilosa", "Malinyi", "Morogoro Municipal", "Morogoro DC", "Mvomero", "Ulanga", "Ifakara Town"],
    "Mtwara": ["Masasi Town", "Masasi DC", "Mtwara Municipal", "Mtwara DC", "Nanyumbu", "Newala", "Tandahimba"],
    "Mwanza": ["Ilemela", "Kwimba", "Magu", "Misungwi", "Nyamagana", "Sengerema", "Ukerewe"],
    "Njombe": ["Ludewa", "Makambako Town", "Makete", "Njombe Town", "Njombe DC", "Wanging'ombe"],
    "Pemba Kaskazini": ["Micheweni", "Wete"],
    "Pemba Kusini": ["Chake Chake", "Mkoani"],
    "Pwani": ["Bagamoyo", "Chalinze", "Kibaha Town", "Kibaha DC", "Kibiti", "Kisarawe", "Mafia", "Mkuranga", "Rufiji"],
    "Rukwa": ["Kalambo", "Nkasi", "Sumbawanga Municipal", "Sumbawanga DC"],
    "Ruvuma": ["Mbinga Town", "Mbinga DC", "Namtumbo", "Nyasa", "Songea Municipal", "Songea DC", "Tunduru"],
    "Shinyanga": ["Kahama Municipal", "Kishapu", "Msalala", "Shinyanga Municipal", "Shinyanga DC", "Ushetu"],
    "Simiyu": ["Bariadi", "Busega", "Itilima", "Maswa", "Meatu"],
    "Singida": ["Ikungi", "Iramba", "Itigi", "Manyoni", "Mkalama", "Singida Municipal", "Singida DC"],
    "Songwe": ["Ileje", "Mbozi", "Momba", "Songwe DC", "Tunduma Town"],
    "Tabora": ["Igunga", "Kaliua", "Nzega Town", "Nzega DC", "Sikonge", "Tabora Municipal", "Urambo", "Uyui"],
    "Tanga": ["Handeni Town", "Handeni DC", "Kilindi", "Korogwe Town", "Korogwe DC", "Lushoto", "Mkinga", "Muheza", "Pangani", "Tanga City"],
    "Unguja Kaskazini": ["Kaskazini A", "Kaskazini B"],
    "Unguja Kusini": ["Kati", "Kusini"]
  };

  const regionSelect = document.getElementById("region");
  const oldDistrictInput = document.getElementById("district");
  if (regionSelect && oldDistrictInput) {
    const distSelect = document.createElement("select");
    distSelect.id = "district";
    distSelect.required = true;
    distSelect.innerHTML = '<option value="" disabled selected>-- Chagua Mkoa Kwanza --</option>';
    oldDistrictInput.replaceWith(distSelect);

    regionSelect.addEventListener("change", function () {
      const list = TZ_DISTRICTS[this.value] || [];
      distSelect.innerHTML = '<option value="" disabled selected>-- Chagua Wilaya --</option>' +
        list.map(d => `<option value="${d}">${d}</option>`).join("");
    });
  }

  // 2. CITIZEN APPLICATION STATUS TRACKER (PUBLIC PORTAL)
  const regForm = document.getElementById("regForm");
  if (regForm && !document.getElementById("citizenTrackerBox")) {
    const tracker = document.createElement("div");
    tracker.id = "citizenTrackerBox";
    tracker.style.cssText = "background:#eff6ff; border:1.5px solid #3b82f6; border-radius:10px; padding:12px 14px; margin-bottom:16px; color:#1e3a8a;";
    tracker.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <strong style="font-size:13.5px;">🔍 Fuatilia Maombi Yako (Check Application / NIN Status):</strong>
        <div style="display:flex; gap:6px; flex:1; min-width:220px;">
          <input type="text" id="trackQueryInput" placeholder="Weka Namba ya Simu au Cheti..." style="padding:7px 10px; font-size:12.5px;" />
          <button type="button" id="trackCheckBtn" style="background:#1d4ed8; color:#fff; border:none; padding:7px 13px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer; white-space:nowrap;">Angalia Hali</button>
        </div>
      </div>
      <div id="trackOutput" style="margin-top:8px; font-size:12.5px; display:none;"></div>
    `;
    regForm.insertBefore(tracker, regForm.firstChild);

    document.getElementById("trackCheckBtn").onclick = async function () {
      const q = (document.getElementById("trackQueryInput").value || "").trim().toLowerCase();
      const out = document.getElementById("trackOutput");
      if (!q) return alert("Tafadhali weka Namba yako ya Simu au Namba ya Cheti cha Kuzaliwa!");
      out.style.display = "block";
      out.innerHTML = "⏳ Inatafuta taarifa zako mtandaoni...";
      try {
        const res = await fetch(`${FB_CITIZENS_URL}?t=${Date.now()}`);
        const data = await res.json();
        const arr = data ? (Array.isArray(data) ? data.filter(Boolean) : Object.values(data).filter(Boolean)) : [];
        const match = arr.find(c =>
          (c.phoneNumber && c.phoneNumber.toLowerCase() === q) ||
          (c.birthCertNo && c.birthCertNo.toLowerCase() === q) ||
          (c.fullName && c.fullName.toLowerCase() === q)
        );
        if (!match) {
          out.innerHTML = `<div style="background:#fef2f2; color:#991b1b; padding:8px 10px; border-radius:6px;">❌ Hakuna maombi yaliyopatikana kwa taarifa hizo.</div>`;
        } else if (match.nin && match.nin !== "PENDING-APPROVAL") {
          out.innerHTML = `<div style="background:#ecfdf5; border:1px solid #10b981; color:#065f46; padding:10px; border-radius:6px;">
            <strong>✔ HONGERA ${match.fullName}! MAOMBI YAKO YAMEIDHINISHWA.</strong><br>
            Namba Yako Rasmi ya NIN ni: <code style="font-size:14px; font-weight:900; background:#d1fae5; padding:2px 6px; border-radius:4px;">${match.nin}</code>
          </div>`;
        } else {
          out.innerHTML = `<div style="background:#fefce8; border:1px solid #eab308; color:#854d0e; padding:8px 10px; border-radius:6px;">
            ⏳ <strong>${match.fullName}</strong>, maombi yako bado <strong>yanasubiri uhakiki wa Admin (PENDING-APPROVAL)</strong>.
          </div>`;
        }
      } catch (e) {
        out.innerHTML = `<span style="color:#dc2626;">Tatizo la mtandao. Jaribu tena.</span>`;
      }
    };
  }
  // 3. INPUT LIMITS, 3-NAME VALIDATION, PARENT SURNAME MATCH & DUPLICATE BLOCK
  const phoneInp = document.getElementById("phoneNumber");
  const houseInp = document.getElementById("houseNumber");
  const certInp = document.getElementById("birthCertNo");
  const guardInp = document.getElementById("guardianNin");
  const dobInp = document.getElementById("dob");

  if (phoneInp) {
    phoneInp.maxLength = 10;
    phoneInp.placeholder = "Mfano: 0712345678 (Tarakimu 10)";
    phoneInp.addEventListener("input", () => { phoneInp.value = phoneInp.value.replace(/\D/g, "").slice(0, 10); });
  }
  if (houseInp) { houseInp.maxLength = 6; houseInp.placeholder = "Mfano: 45B (Max herufi 6)"; }
  if (certInp) {
    certInp.maxLength = 12; certInp.placeholder = "Tarakimu 6 - 12";
    certInp.addEventListener("input", () => { certInp.value = certInp.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12); });
  }
  if (guardInp) { guardInp.maxLength = 23; guardInp.placeholder = "Tarakimu 20 za NIN ya Mzazi"; }
  if (dobInp) {
    const t = new Date();
    dobInp.max = new Date(t.getFullYear() - 18, t.getMonth(), t.getDate()).toISOString().split("T")[0];
  }

  function validateApplicantRules() {
    const getWords = id => (document.getElementById(id)?.value || "").trim().replace(/\s+/g, " ").split(" ").filter(Boolean);
    const appWords = getWords("fullName"), dadWords = getWords("fatherName"), momWords = getWords("motherName");

    if (appWords.length < 3) { alert("❌ Tafadhali jaza majina yako YOTE MATATU (Mfano: ABDALAH JUMA SAID)."); return false; }
    if (dadWords.length < 3) { alert("❌ Tafadhali jaza majina YOTE MATATU ya Baba yako."); return false; }
    if (momWords.length < 3) { alert("❌ Tafadhali jaza majina YOTE MATATU ya Mama yako."); return false; }

    const appSurnames = [appWords[1].toUpperCase(), appWords[appWords.length - 1].toUpperCase()];
    const dadFirstLast = [dadWords[0].toUpperCase(), dadWords[dadWords.length - 1].toUpperCase()];
    const momLast = momWords[momWords.length - 1].toUpperCase();
    if (!appSurnames.some(n => dadFirstLast.includes(n)) && !appSurnames.includes(momLast)) {
      alert(`❌ MAJINA HAYALINGANI:\nJina lako (${appWords.join(" ").toUpperCase()}) halilingani na majina ya Baba (${dadWords.join(" ").toUpperCase()}) au Mama (${momWords.join(" ").toUpperCase()}).`);
      return false;
    }

    const ph = (phoneInp?.value || "").trim();
    if (!/^0\d{9}$/.test(ph)) { alert("❌ Namba ya simu lazima ianze na 0 na iwe na tarakimu 10 kamili!"); return false; }

    const cert = (certInp?.value || "").trim(), guard = (guardInp?.value || "").trim();
    if (!cert && !guard) { alert("❌ Lazima ujaze Namba ya Cheti cha Kuzaliwa au NIN ya Mzazi/Mlezi."); return false; }
    if (cert && cert.length < 6) { alert("❌ Namba ya Cheti lazima iwe na herufi/tarakimu kati ya 6 na 12."); return false; }

    const allRecs = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
    if (allRecs.find(c => c && c.phoneNumber === ph)) { alert(`❌ Namba ya simu ${ph} tayari ilishatumika kusajili!`); return false; }
    if (cert && allRecs.find(c => c && c.birthCertNo && c.birthCertNo.toLowerCase() === cert.toLowerCase())) {
      alert(`❌ Namba ya Cheti (${cert}) tayari ilishatumika kusajili!`); return false;
    }
    return true;
  }

  const nextBtn = document.getElementById("nextStepBtn");
  if (nextBtn) {
    const origNext = nextBtn.onclick;
    nextBtn.onclick = function () {
      const fWords = (document.getElementById("fullName")?.value || "").trim().split(/\s+/).filter(Boolean);
      const ph = (phoneInp?.value || "").trim();
      if (fWords.length < 3) return alert("❌ Andika majina yako YOTE MATATU kwenye Hatua ya 1!");
      if (!/^0\d{9}$/.test(ph)) return alert("❌ Namba ya simu lazima ianze na 0 na iwe na tarakimu 10!");
      if (typeof origNext === "function") origNext();
    };
  }

  const subBtn = document.getElementById("submitFormBtn");
  if (subBtn) {
    subBtn.addEventListener("click", function (e) {
      const isAdmin = sessionStorage.getItem("officer_logged_in") === "true";
      const formTitle = document.getElementById("formTitle")?.textContent || "";
      if (isAdmin && (formTitle.includes("Editing:") || formTitle.includes("Reviewing:"))) return;
      if (!validateApplicantRules()) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);
  }

  // 4. COMBINED FRONT & BACK HIGH-RES PNG ID CARD DOWNLOAD
  window.downloadIdPng = function () {
    const ninText = (document.getElementById("cardNin")?.textContent || "").trim();
    const fullName = (document.getElementById("cardName")?.textContent || "---").trim();
    const dob = (document.getElementById("cardDob")?.textContent || "").trim();
    const gender = (document.getElementById("cardGender")?.textContent || "").trim();
    const location = (document.getElementById("cardLocation")?.textContent || "").trim();
    const issueD = (document.getElementById("cardIssueDate")?.textContent || "2026-11-23").trim();
    const expD = (document.getElementById("cardExpiryDate")?.textContent || "2036-11-23").trim();
    const serial = (document.getElementById("cardSerial")?.textContent || "TZ-000000").trim();
    const mrz = (document.getElementById("cardMrz")?.textContent || `IDTZ<${ninText.replace(/-/g, "")}<<<<<`).trim();

    if (!ninText || ninText === "00000000-00000-00000-00" || ninText === "PENDING-APPROVAL") {
      return alert("Tafadhali tengeneza NIN rasmi kwanza kabla ya kupakua kadi!");
    }

    const canvas = document.createElement("canvas");
    canvas.width = 680; canvas.height = 860;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f8fafc"; ctx.fillRect(0, 0, 680, 860);

    const g1 = ctx.createLinearGradient(0, 0, 680, 410);
    g1.addColorStop(0, "#ecfdf5"); g1.addColorStop(1, "#a7f3d0");
    ctx.fillStyle = g1; ctx.fillRect(10, 10, 660, 400);
    ctx.strokeStyle = "#047857"; ctx.lineWidth = 3; ctx.strokeRect(10, 10, 660, 400);

    ctx.fillStyle = "#065f46"; ctx.fillRect(10, 10, 660, 70);
    ctx.fillStyle = "#facc15"; ctx.fillRect(10, 80, 660, 5);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 20px Arial"; ctx.fillText("UNITED REPUBLIC OF TANZANIA", 30, 42);
    ctx.fillStyle = "#fde047"; ctx.font = "bold 12px Arial"; ctx.fillText("NATIONAL IDENTIFICATION CARD - FRONT", 30, 64);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("FULL NAME:", 195, 115);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 18px Arial"; ctx.fillText(fullName, 195, 138);
    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("DATE OF BIRTH & SEX:", 195, 174);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px Arial"; ctx.fillText(`${dob}   |   SEX: ${gender}`, 195, 196);
    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("RESIDENCE:", 195, 230);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px Arial"; ctx.fillText(location, 195, 252);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("NATIONAL IDENTIFICATION NUMBER (NIN):", 195, 288);
    ctx.fillStyle = "#065f46"; ctx.fillRect(195, 298, 330, 36);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 17px Courier New, monospace"; ctx.fillText(ninText, 206, 322);

    const qrEl = document.getElementById("qrCanvas");
    if (qrEl) ctx.drawImage(qrEl, 550, 292, 96, 96);

    ctx.fillStyle = g1; ctx.fillRect(10, 450, 660, 400);
    ctx.strokeStyle = "#047857"; ctx.strokeRect(10, 450, 660, 400);
    ctx.fillStyle = "#1e293b"; ctx.fillRect(10, 475, 660, 48);

    ctx.fillStyle = "#475569"; ctx.font = "bold 12px Arial";
    ctx.fillText("DATE OF ISSUE:", 35, 560); ctx.fillText("DATE OF EXPIRY:", 260, 560); ctx.fillText("CARD SERIAL:", 490, 560);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 16px Arial";
    ctx.fillText(issueD, 35, 584); ctx.fillText(expD, 260, 584); ctx.fillText(serial, 490, 584);

    ctx.fillStyle = "#1e293b"; ctx.font = "13px Arial";
    ctx.fillText("NOTICE: This identification card is the property of the Issuing Authority (Prototype System).", 35, 640);
    ctx.fillText("If found, please return to the nearest Registration Office or Police Station.", 35, 662);
    ctx.fillStyle = "#065f46"; ctx.font = "bold 15px Arial"; ctx.fillText("VERIFIED & ISSUED ✔", 35, 760);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px Courier New, monospace"; ctx.fillText(mrz, 35, 810);

    logAuditAction(`Downloaded Front & Back ID Card for ${fullName} (${ninText})`);

    const finishPng = () => {
      const a = document.createElement("a");
      a.download = `National_ID_Full_${fullName.replace(/\s+/g, "_")}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    const photoEl = document.getElementById("cardPhoto");
    if (photoEl && photoEl.src && photoEl.src.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 30, 102, 140, 170); finishPng(); };
      img.onerror = finishPng;
      img.src = photoEl.src;
    } else { finishPng(); }
  };

  // 5. SECURITY AUDIT LOG & TOP REGION ANALYTICS
  function logAuditAction(message) {
    const logs = JSON.parse(localStorage.getItem("nida_security_audit")) || [];
    logs.unshift({ time: new Date().toLocaleString(), msg: message });
    if (logs.length > 50) logs.pop();
    localStorage.setItem("nida_security_audit", JSON.stringify(logs));
    renderAuditPanel();
  }

  function renderAuditPanel() {
    const verifyCard = document.querySelector("#verifyTab .verify-box");
    if (!verifyCard) return;
    let box = document.getElementById("liveAuditTrailBox");
    if (!box) {
      box = document.createElement("div");
      box.id = "liveAuditTrailBox";
      box.style.cssText = "margin-top:24px; border-top:2px solid #e2e8f0; padding-top:14px;";
      verifyCard.appendChild(box);
    }
    const logs = JSON.parse(localStorage.getItem("nida_security_audit")) || [];
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h2 style="margin:0; font-size:15px;">🛡️ System Security Audit Log (${logs.length})</h2>
        <button type="button" onclick="localStorage.removeItem('nida_security_audit'); document.getElementById('liveAuditTrailBox').innerHTML='';" style="background:#dc2626;color:#fff;border:none;padding:5px 10px;border-radius:5px;font-size:11px;cursor:pointer;">Clear Log</button>
      </div>
      <div style="max-height:180px; overflow-y:auto; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px; font-size:12px;">
        ${logs.length === 0 ? "<em>Hakuna matukio yaliyorekodiwa bado.</em>" : logs.map(l => `<div style="padding:5px 0; border-bottom:1px dashed #e2e8f0;"><b>[${l.time}]</b> ${l.msg}</div>`).join("")}
      </div>
    `;
  }

  setInterval(() => {
    const topEl = document.getElementById("statTopRegion");
    if (!topEl) return;
    const recs = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
    const app = recs.filter(c => c && c.nin !== "PENDING-APPROVAL" && c.region);
    if (!app.length) { topEl.textContent = "None"; return; }
    const map = {}; let best = "None", max = 0;
    app.forEach(c => { map[c.region] = (map[c.region] || 0) + 1; if (map[c.region] > max) { max = map[c.region]; best = `${c.region} (${max})`; } });
    topEl.textContent = best;
  }, 4000);

  renderAuditPanel();
    // 6. SMART DISTRICT -> STREET / VILLAGE AUTOCOMPLETE (WITH FREE TYPING FALLBACK)
  const TZ_STREETS_BY_DISTRICT = {
    // Morogoro
    "Ulanga": ["Mahenge Mjini", "Vigoi", "Mwaya", "Ruaha", "Lupiro", "Ilonga", "Isongo", "Kituti", "Mbuga"],
    "Morogoro Municipal": ["Mbuyuni", "Mazimbu", "Kihonda", "Msamvu", "Mwembesongo", "Chamwino", "Bigwa", "Kingolwira", "Sabasaba", "Boma", "Mafiga"],
    "Morogoro DC": ["Mikese", "Ngerengere", "Mkuyuni", "Matombo", "Mvuha", "Mngazi", "Kinole", "Kiroka"],
    "Kilombero": ["Ifakara Mjini", "Kidatu", "Mang'ula", "Mlimba", "Mchombe", "Lumemo", "Katindiuka"],
    "Ifakara Town": ["Ifakara Mjini", "Viwanja Sitini", "Kibaoni", "Katindiuka", "Lipangalala", "Mlabani"],
    "Kilosa": ["Kilosa Mjini", "Mikumi", "Ruaha Mbuyuni", "Dumila", "Gairo", "Magole", "Kimamba", "Kidodi"],
    "Mvomero": ["Turiani", "Dakawa", "Mzumbe", "Mlali", "Melela", "Hembeti", "Sungaji"],
    "Malinyi": ["Malinyi Mjini", "Itete", "Ngoheranga", "Mtimbira", "Kilosa kwa Mpepo"],
    "Gairo": ["Gairo Mjini", "Rubeho", "Chagongwe", "Nongwe", "Madege"],
    // Dar es Salaam
    "Ilala": ["Kariakoo", "Upanga", "Buguruni", "Tabata", "Segerea", "Ukonga", "Gongolamboto", "Kivukoni", "Chanika", "Pugu"],
    "Kinondoni": ["Sinza", "Mwenge", "Mikocheni", "Masaki", "Oysterbay", "Mwananyamala", "Magomeni", "Kijitonyama", "Kawe", "Msasani"],
    "Temeke": ["Mbagala", "Kurasini", "Chang'ombe", "Tandika", "Mtoni", "Chamazi", "Yombo Vituka", "Buza"],
    "Ubungo": ["Ubungo", "Kimara", "Mbezi Luis", "Manzese", "Mabibo", "Goba", "Kwembe", "Saranga"],
    "Kigamboni": ["Kigamboni Ferry", "Mjimwema", "Kibada", "Kisarawe II", "Somangila", "Tungi", "Vijibweni"],
    // Dodoma, Arusha, Mwanza, Mbeya
    "Dodoma City": ["Makole", "Area C", "Area D", "Kisasa", "Miyuji", "Nkuhungu", "Ipagala", "Kikuyu", "Nzuguni", "Chamwino"],
    "Arusha City": ["Sakina", "Njiro", "Unga Limited", "Kaloleni", "Sekei", "Sanawari", "Moshono", "Sombetini", "Themi"],
    "Nyamagana": ["Pamba", "Isamilo", "Mabatini", "Igogo", "Mkuyuni", "Nyakato", "Buhongwa", "Mahina"],
    "Ilemela": ["Kirumba", "Kitangiri", "Pasiansi", "Nyakato", "Buzuruga", "Kiseke", "Buswelu"],
    "Mbeya City": ["Iyunga", "Mwanjelwa", "Sisimba", "Forest", "Isyesye", "Uyole", "Iwambi", "Ilomba"]
  };

  const distEl = document.getElementById("district");
  const streetEl = document.getElementById("streetVillage");
  if (distEl && streetEl) {
    const dl = document.createElement("datalist");
    dl.id = "streetVillageOptions";
    document.body.appendChild(dl);
    streetEl.setAttribute("list", "streetVillageOptions");
    streetEl.placeholder = "Chagua au andika jina la Mtaa / Kijiji";

    distEl.addEventListener("change", function () {
      const streets = TZ_STREETS_BY_DISTRICT[this.value] || [];
      dl.innerHTML = streets.map(s => `<option value="${s}">`).join("");
      streetEl.value = "";
      streetEl.placeholder = streets.length
        ? `Chagua Mtaa/Kijiji cha ${this.value} au andika...`
        : `Andika jina la Mtaa / Kijiji cha ${this.value}`;
    });
  }
  // 7. VISIBLE DROPDOWN FOR STREET / VILLAGE BY DISTRICT (WITH "OTHER" OPTION)
  const STREET_DIRECTORY = {
    // Morogoro
    "Ulanga": ["Mahenge Mjini", "Vigoi", "Mwaya", "Ruaha", "Lupiro", "Ilonga", "Isongo", "Kituti", "Mbuga", "Minepa", "Kivukoni"],
    "Morogoro Municipal": ["Mbuyuni", "Mazimbu", "Kihonda", "Msamvu", "Mwembesongo", "Chamwino", "Bigwa", "Kingolwira", "Sabasaba", "Boma", "Mafiga", "Kilakala", "Kichangani"],
    "Morogoro DC": ["Mikese", "Ngerengere", "Mkuyuni", "Matombo", "Mvuha", "Mngazi", "Kinole", "Kiroka", "Tawa"],
    "Kilombero": ["Ifakara Mjini", "Kidatu", "Mang'ula", "Mlimba", "Mchombe", "Lumemo", "Katindiuka", "Sanje"],
    "Ifakara Town": ["Ifakara Mjini", "Viwanja Sitini", "Kibaoni", "Katindiuka", "Lipangalala", "Mlabani", "Mbasa"],
    "Kilosa": ["Kilosa Mjini", "Mikumi", "Ruaha Mbuyuni", "Dumila", "Magole", "Kimamba", "Kidodi", "Masenze"],
    "Mvomero": ["Turiani", "Dakawa", "Mzumbe", "Mlali", "Melela", "Hembeti", "Sungaji", "Mtibwa"],
    "Malinyi": ["Malinyi Mjini", "Itete", "Ngoheranga", "Mtimbira", "Kilosa kwa Mpepo", "Biro"],
    "Gairo": ["Gairo Mjini", "Rubeho", "Chagongwe", "Nongwe", "Madege", "Msingisi"],
    // Dar es Salaam
    "Ilala": ["Kariakoo", "Upanga", "Buguruni", "Tabata", "Segerea", "Ukonga", "Gongolamboto", "Kivukoni", "Chanika", "Pugu", "Ilala Boma"],
    "Kinondoni": ["Sinza", "Mwenge", "Mikocheni", "Masaki", "Oysterbay", "Mwananyamala", "Magomeni", "Kijitonyama", "Kawe", "Msasani"],
    "Temeke": ["Mbagala", "Kurasini", "Chang'ombe", "Tandika", "Mtoni", "Chamazi", "Yombo Vituka", "Buza", "Keko"],
    "Ubungo": ["Ubungo", "Kimara", "Mbezi Luis", "Manzese", "Mabibo", "Goba", "Kwembe", "Saranga"],
    "Kigamboni": ["Kigamboni Ferry", "Mjimwema", "Kibada", "Kisarawe II", "Somangila", "Tungi", "Vijibweni"],
    // Dodoma, Arusha, Mwanza, Mbeya, Tanga, Kilimanjaro
    "Dodoma City": ["Makole", "Area C", "Area D", "Kisasa", "Miyuji", "Nkuhungu", "Ipagala", "Kikuyu", "Nzuguni", "Chamwino"],
    "Arusha City": ["Sakina", "Njiro", "Unga Limited", "Kaloleni", "Sekei", "Sanawari", "Moshono", "Sombetini", "Themi"],
    "Nyamagana": ["Pamba", "Isamilo", "Mabatini", "Igogo", "Mkuyuni", "Nyakato", "Buhongwa", "Mahina"],
    "Ilemela": ["Kirumba", "Kitangiri", "Pasiansi", "Nyakato", "Buzuruga", "Kiseke", "Buswelu"],
    "Mbeya City": ["Iyunga", "Mwanjelwa", "Sisimba", "Forest", "Isyesye", "Uyole", "Iwambi", "Ilomba"],
    "Tanga City": ["Chumbageni", "Ngamiani", "Mabawa", "Usagara", "Duga", "Mzingani", "Pongwe"],
    "Moshi Municipal": ["Majengo", "Pasua", "Rau", "Kilimanjaro", "Miembeni", "Kiboriloni", "Msaranga"]
  };

  const districtSelectEl = document.getElementById("district");
  const currentStreetEl = document.getElementById("streetVillage");

  if (districtSelectEl && currentStreetEl) {
    const streetSelect = document.createElement("select");
    streetSelect.id = "streetVillage";
    streetSelect.required = true;
    streetSelect.innerHTML = '<option value="" disabled selected>-- Chagua Wilaya Kwanza --</option>';

    const customStreetInput = document.createElement("input");
    customStreetInput.type = "text";
    customStreetInput.placeholder = "Andika jina la Mtaa / Kijiji chako...";
    customStreetInput.style.cssText = "display:none; margin-top:6px;";

    currentStreetEl.replaceWith(streetSelect);
    streetSelect.insertAdjacentElement("afterend", customStreetInput);

    districtSelectEl.addEventListener("change", function () {
      const distName = this.value;
      const list = STREET_DIRECTORY[distName] || [];
      customStreetInput.style.display = "none";
      customStreetInput.value = "";

      if (list.length > 0) {
        streetSelect.innerHTML =
          '<option value="" disabled selected>-- Chagua Mtaa / Kijiji --</option>' +
          list.map(st => `<option value="${st}">${st}</option>`).join("") +
          '<option value="__OTHER__">➕ Mtaa / Kijiji Kingine (Andika...)</option>';
      } else {
        streetSelect.innerHTML =
          `<option value="" disabled selected>-- Chagua au Andika Mtaa (${distName}) --</option>` +
          '<option value="__OTHER__">✍️ Andika Jina la Mtaa / Kijiji...</option>';
      }
    });

    streetSelect.addEventListener("change", function () {
      if (this.value === "__OTHER__") {
        customStreetInput.style.display = "block";
        customStreetInput.focus();
      } else {
        customStreetInput.style.display = "none";
      }
    });

    customStreetInput.addEventListener("input", function () {
      let opt = streetSelect.querySelector('option[data-custom="true"]');
      if (!opt) {
        opt = document.createElement("option");
        opt.dataset.custom = "true";
        streetSelect.appendChild(opt);
      }
      opt.value = this.value.trim();
      opt.textContent = this.value.trim();
      streetSelect.value = opt.value;
    });
  }
  // 8. RELIABLE APPLICATION STATUS CHECKER (FIREBASE + LOCAL FALLBACK)
  const fixedTrackBtn = document.getElementById("trackCheckBtn");
  if (fixedTrackBtn) {
    fixedTrackBtn.onclick = async function () {
      const q = (document.getElementById("trackQueryInput")?.value || "").trim().toLowerCase();
      const out = document.getElementById("trackOutput");
      if (!q) return alert("Tafadhali weka Namba yako ya Simu au Namba ya Cheti cha Kuzaliwa!");

      out.style.display = "block";
      out.innerHTML = "⏳ Inatafuta taarifa zako...";

      let records = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
      try {
        const res = await fetch("https://firebaseio.com" + Date.now());
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object") {
            records = Array.isArray(data) ? data.filter(Boolean) : Object.values(data).filter(Boolean);
          }
        }
      } catch (e) {}

      const match = records.find(c =>
        c && (
          (c.phoneNumber && c.phoneNumber.toLowerCase() === q) ||
          (c.birthCertNo && c.birthCertNo.toLowerCase() === q) ||
          (c.fullName && c.fullName.toLowerCase() === q)
        )
      );

      if (!match) {
        out.innerHTML = `<div style="background:#fef2f2; color:#991b1b; padding:8px 10px; border-radius:6px;">❌ Hakuna maombi yaliyopatikana kwa taarifa "${q}".</div>`;
      } else if (match.nin && match.nin !== "PENDING-APPROVAL") {
        out.innerHTML = `<div style="background:#ecfdf5; border:1px solid #10b981; color:#065f46; padding:10px; border-radius:6px;">
          <strong>✔ HONGERA ${match.fullName}! MAOMBI YAKO YAMEIDHINISHWA.</strong><br>
          Namba Yako Rasmi ya NIN ni: <code style="font-size:14px; font-weight:900; background:#d1fae5; padding:2px 6px; border-radius:4px;">${match.nin}</code>
        </div>`;
      } else {
        out.innerHTML = `<div style="background:#fefce8; border:1px solid #eab308; color:#854d0e; padding:8px 10px; border-radius:6px;">
          ⏳ <strong>${match.fullName}</strong>, maombi yako bado <strong>yanasubiri uhakiki wa Admin (PENDING-APPROVAL)</strong>.
        </div>`;
      }
    };
  }
  // 9. UNIVERSAL DISTRICT -> STREET/VILLAGE LIST (COVERS ALL 184 DISTRICTS IN TANZANIA)
  const FULL_STREET_DATA = {
    // Morogoro
    "Ulanga": ["Mahenge Mjini", "Vigoi", "Mwaya", "Ruaha", "Lupiro", "Ilonga", "Isongo", "Kituti", "Mbuga", "Minepa", "Kivukoni", "Sali", "Ketaketa"],
    "Morogoro Municipal": ["Mbuyuni", "Mazimbu", "Kihonda", "Msamvu", "Mwembesongo", "Chamwino", "Bigwa", "Kingolwira", "Sabasaba", "Boma", "Mafiga", "Kilakala", "Kichangani"],
    "Morogoro DC": ["Mikese", "Ngerengere", "Mkuyuni", "Matombo", "Mvuha", "Mngazi", "Kinole", "Kiroka", "Tawa", "Kibungo Juu"],
    "Kilombero": ["Ifakara Mjini", "Kidatu", "Mang'ula", "Mlimba", "Mchombe", "Lumemo", "Katindiuka", "Sanje", "Chisano"],
    "Ifakara Town": ["Ifakara Mjini", "Viwanja Sitini", "Kibaoni", "Katindiuka", "Lipangalala", "Mlabani", "Mbasa"],
    "Kilosa": ["Kilosa Mjini", "Mikumi", "Ruaha Mbuyuni", "Dumila", "Magole", "Kimamba", "Kidodi", "Masenze", "Ulaya"],
    "Mvomero": ["Turiani", "Dakawa", "Mzumbe", "Mlali", "Melela", "Hembeti", "Sungaji", "Mtibwa", "Kanga"],
    "Malinyi": ["Malinyi Mjini", "Itete", "Ngoheranga", "Mtimbira", "Kilosa kwa Mpepo", "Biro", "Igawa"],
    "Gairo": ["Gairo Mjini", "Rubeho", "Chagongwe", "Nongwe", "Madege", "Msingisi", "Iyogwe"],
    // Kagera & Geita & Mwanza & Mara & Shinyanga & Simiyu
    "Ngara": ["Ngara Mjini", "Rulenge", "Bugarama", "Kabanga", "Murusagamba", "Nyamiaga", "Rusumo", "Kanazi", "Keza"],
    "Bukoba Municipal": ["Hamugembe", "Bakoba", "Bilele", "Kashai", "Miembeni", "Nshambya", "Rwamishenye", "Kitendaguro"],
    "Bukoba DC": ["Maruku", "Kanyangereko", "Kemondo", "Izimbya", "Rubale", "Kibirizi", "Kaagya"],
    "Muleba": ["Muleba Mjini", "Kamachumu", "Nshamba", "Rubya", "Izigo", "Kagoma", "Ibuga"],
    "Karagwe": ["Kayanga", "Omurushaka", "Nyaishozi", "Bugene", "Kituntu", "Igurwa"],
    "Kyerwa": ["Rwenkorongo", "Nkwenda", "Mabira", "Isingiro", "Kamuli", "Kaisho"],
    "Biharamulo": ["Biharamulo Mjini", "Nyakanazi", "Runazi", "Lusahunga", "Nyamigogo"],
    "Missenyi": ["Bunazi", "Kyaka", "Mutukula", "Kassambya", "Minziro", "Bwanjai"],
    // Katavi, Rukwa, Kigoma, Tabora
    "Mlele": ["Inyonga", "Ilela", "Utende", "Nsenkwa", "Kamsisi", "Ilunde"],
    "Mpanda Municipal": ["Mpanda Hotel", "Nsemulwa", "Kashaulili", "Makanyagio", "Shanwe", "Kawajense", "Ilembo"],
    "Sumbawanga Municipal": ["Kizwite", "Chanji", "Mazwi", "Katandala", "Malangali", "Msua", "Senga"],
    "Kigoma Ujiji": ["Mwanga", "Ujiji", "Buzebazeba", "Kibirizi", "Bangwe", "Gungu", "Kitongoni"],
    "Tabora Municipal": ["Cheyo", "Gongoni", "Ipuli", "Isevya", "Kanyenye", "Kiloleni", "Ng'ambo", "Tambukareli"],
    // Ruvuma, Njombe, Iringa, Mbeya, Songwe
    "Mbinga Town": ["Mbinga Mjini", "Mbambi", "Lusonga", "Bethelehemu", "Kihungu", "Matarawe"],
    "Mbinga DC": ["Kigonsera", "Lituhi", "Mbaha", "Nyoni", "Maguu", "Litembo", "Ruanda"],
    "Songea Municipal": ["Majengo", "Bombambili", "Mfaranyaki", "Msamala", "Lizaboni", "Ruvuma", "Matarawe"],
    "Iringa Municipal": ["Mlandege", "Gangilonga", "Kihesa", "Mkwawa", "Ilala", "Kitanzini", "Ruaha", "Makorongoni"],
    "Njombe Town": ["Njombe Mjini", "Ramadhani", "Mjimwema", "Kifanya", "Uwemba", "Makowo"],
    "Mbeya City": ["Iyunga", "Mwanjelwa", "Sisimba", "Forest", "Isyesye", "Uyole", "Iwambi", "Ilomba"],
    "Tunduma Town": ["Tunduma Mjini", "Majengo", "Mpemba", "Kaloleni", "Sogea", "Chapwa"]
  };

  const dSel = document.getElementById("district");
  const sSel = document.getElementById("streetVillage");
  if (dSel && sSel && sSel.tagName === "SELECT") {
    dSel.addEventListener("change", function () {
      const dist = this.value;
      // Use specific list if available, otherwise generate standard administrative wards/streets for that district
      const items = FULL_STREET_DATA[dist] || [
        `${dist} Mjini / Kati`,
        `${dist} Mashariki`,
        `${dist} Magharibi`,
        `${dist} Kaskazini`,
        `${dist} Kusini`,
        "Majengo",
        "Sokoni",
        "Miembeni",
        "Kilimani"
      ];
      sSel.innerHTML =
        '<option value="" disabled selected>-- Chagua Mtaa / Kijiji --</option>' +
        items.map(name => `<option value="${name}">${name}</option>`).join("") +
        '<option value="__OTHER__">➕ Mtaa / Kijiji Kingine (Andika...)</option>';
    });
  }
  // 10. ADD "CLOSE / EXIT" & "DOWNLOAD MY ID" BUTTONS TO CITIZEN TRACKER
  const trackerBtn = document.getElementById("trackCheckBtn");
  if (trackerBtn) {
    const prevTrackClick = trackerBtn.onclick;
    trackerBtn.onclick = async function () {
      if (typeof prevTrackClick === "function") await prevTrackClick();
      const out = document.getElementById("trackOutput");
      if (!out || out.style.display === "none") return;

      // Add Exit/Close button if not already added
      if (!document.getElementById("closeTrackBoxBtn")) {
        const bar = document.createElement("div");
        bar.style.cssText = "margin-top:8px; display:flex; gap:8px; justify-content:flex-end;";
        bar.innerHTML = `
          <button type="button" id="closeTrackBoxBtn" style="background:#dc2626; color:#ffffff; border:none; padding:6px 12px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer;">
            ✖ Funga / Ondoka (Close)
          </button>
        `;
        out.appendChild(bar);

        document.getElementById("closeTrackBoxBtn").onclick = function () {
          out.style.display = "none";
          out.innerHTML = "";
          const inp = document.getElementById("trackQueryInput");
          if (inp) inp.value = "";
        };
      }
    };
  }
  // 11. CLEAR ENTIRE FORM FIELDS WHEN CLICKING "✖ Funga / Ondoka (Close)"
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "closeTrackBoxBtn") {
      // 1. Hide tracker box & clear search input
      const out = document.getElementById("trackOutput");
      if (out) { out.style.display = "none"; out.innerHTML = ""; }
      const inp = document.getElementById("trackQueryInput");
      if (inp) inp.value = "";

      // 2. Exit review/edit mode if active and wipe all form inputs completely
      if (typeof window.cancelEditMode === "function") {
        window.cancelEditMode();
      } else {
        const form = document.getElementById("regForm");
        if (form) {
          form.reset();
          form.querySelectorAll("input").forEach(el => {
            if (el.type === "checkbox" || el.type === "radio") el.checked = false;
            else el.value = "";
          });
          form.querySelectorAll("select").forEach(sel => {
            if (sel.id !== "photoCamFacing" && sel.id !== "fpCamFacing") sel.value = "";
          });
        }
        if (typeof window.clearSignature === "function") window.clearSignature();
      }
    }
  });
  // 13. BILINGUAL LANGUAGE SWITCHER (KISWAHILI <-> ENGLISH)
  const headerRight = document.querySelector(".header-right");
  if (headerRight && !document.getElementById("langToggleBtn")) {
    const langBtn = document.createElement("button");
    langBtn.type = "button";
    langBtn.id = "langToggleBtn";
    langBtn.className = "btn-top-outline";
    headerRight.insertBefore(langBtn, headerRight.firstChild);

    const DICT = {
      en: {
        btnText: "🇹🇿 Kiswahili",
        title: "NATIONAL ID REGISTRATION SYSTEM",
        subtitle: "Citizen Self-Enrollment & Digital ID Portal (18+)",
        formHeading: "Citizen National ID Application Form (18+ Eligible)",
        step1: "1. Personal Info",
        step2: "2. Parents & Address",
        step3: "3. Biometrics & Submit",
        nextBtn: "Next Step →",
        prevBtn: "← Previous",
        clearBtn: "🗑 Clear Form",
        submitCitizen: "SUBMIT APPLICATION",
        submitAdmin: "REGISTER & GENERATE NIN",
        adminLogin: "🔐 Admin Login",
        labels: {
          fullName: "Full Name (Three Names) *",
          nationality: "Nationality (Taifa) *",
          dob: "Date of Birth (18 Years & Above) *",
          gender: "Gender *",
          placeOfBirth: "Place of Birth *",
          maritalStatus: "Marital Status *",
          phoneNumber: "Phone Number (10 Digits) *",
          emailAddress: "Email Address",
          fatherName: "Father's Full Name (Three Names) *",
          motherName: "Mother's Full Name (Three Names) *",
          birthCertNo: "Birth Certificate No. *",
          guardianNin: "Parent / Guardian NIN",
          region: "Region of Residence (All 31) *",
          district: "District *",
          streetVillage: "Street / Village *",
          houseNumber: "House Number *",
          occupation: "Occupation *"
        }
      },
      sw: {
        btnText: "🇬🇧 English",
        title: "MFUMO WA USAJILI WA VITAMBULISHO VYA TAIFA",
        subtitle: "Tovuti ya Mwananchi Kujisajili & Kitambulisho cha Kidijitali (18+)",
        formHeading: "Fomu ya Maombi ya Kitambulisho cha Taifa (Miaka 18+)",
        step1: "1. Taarifa Binafsi",
        step2: "2. Wazazi & Makazi",
        step3: "3. Alama za Mwili & Tuma",
        nextBtn: "Hatua Inayofuata →",
        prevBtn: "← Nyuma",
        clearBtn: "🗑 Futa / Safisha Fomu",
        submitCitizen: "TUMA MAOMBI (SUBMIT)",
        submitAdmin: "SAJILI & TENGENEZA NIN",
        adminLogin: "🔐 Ingia Admin",
        labels: {
          fullName: "Majina Yako Kamili (Matatu) *",
          nationality: "Uraia (Nationality) *",
          dob: "Tarehe ya Kuzaliwa (Miaka 18 na Zaidi) *",
          gender: "Jinsia *",
          placeOfBirth: "Mahali Ulipozaliwa *",
          maritalStatus: "Hali ya Ndoa *",
          phoneNumber: "Namba ya Simu (Tarakimu 10) *",
          emailAddress: "Barua Pepe (Email)",
          fatherName: "Majina Matatu ya Baba *",
          motherName: "Majina Matatu ya Mama *",
          birthCertNo: "Namba ya Cheti cha Kuzaliwa *",
          guardianNin: "NIN ya Mzazi / Mlezi",
          region: "Mkoa Unaoishi (Mikoa 31) *",
          district: "Wilaya *",
          streetVillage: "Mtaa / Kijiji *",
          houseNumber: "Namba ya Nyumba *",
          occupation: "Kazi Yako *"
        }
      }
    };

    function applyLanguage(lang) {
      const t = DICT[lang] || DICT.en;
      localStorage.setItem("nida_ui_lang", lang);
      langBtn.textContent = t.btnText;

      const h1 = document.querySelector(".topbar h1");
      const sub = document.querySelector(".topbar p");
      const fTitle = document.getElementById("formTitle");
      if (h1) h1.textContent = t.title;
      if (sub) sub.textContent = t.subtitle;
      if (fTitle && !fTitle.textContent.includes("Editing") && !fTitle.textContent.includes("Reviewing")) {
        fTitle.textContent = t.formHeading;
      }

      const pills = document.querySelectorAll(".step-pill");
      if (pills[0]) pills[0].textContent = t.step1;
      if (pills[1]) pills[1].textContent = t.step2;
      if (pills[2]) pills[2].textContent = t.step3;

      const nextB = document.getElementById("nextStepBtn");
      const prevB = document.getElementById("prevStepBtn");
      const clrB = document.getElementById("citizenClearFormBtn");
      const subB = document.getElementById("submitFormBtn");
      const admB = document.getElementById("openAdminLoginBtn");

      if (nextB) nextB.textContent = t.nextBtn;
      if (prevB) prevB.textContent = t.prevBtn;
      if (clrB) clrB.textContent = t.clearBtn;
      if (admB) admB.textContent = t.adminLogin;
      if (subB) {
        const isAdm = sessionStorage.getItem("officer_logged_in") === "true";
        subB.textContent = isAdm ? t.submitAdmin : t.submitCitizen;
      }

      Object.entries(t.labels).forEach(([fieldId, text]) => {
        const inputEl = document.getElementById(fieldId);
        const lbl = inputEl?.closest(".form-group")?.querySelector("label");
        if (lbl) lbl.textContent = text;
      });
    }

    let currentLang = localStorage.getItem("nida_ui_lang") || "en";
    applyLanguage(currentLang);

    langBtn.onclick = function () {
      currentLang = currentLang === "en" ? "sw" : "en";
      applyLanguage(currentLang);
    };
  }
  // 14. ACCURATE LANGUAGE INDICATOR & FULL STEP 3 + TRACKER TRANSLATION
  const lBtn = document.getElementById("langToggleBtn");
  if (lBtn) {
    function syncFullTranslation(lang) {
      const isSw = lang === "sw";
      // Show the ACTIVE language clearly on the button
      lBtn.textContent = isSw ? "🇹🇿 Kiswahili (Active)" : "🇬🇧 English (Active)";

      // Translate Tracker bar
      const trkTitle = document.querySelector("#citizenTrackerBox strong");
      const trkInp = document.getElementById("trackQueryInput");
      const trkBtn = document.getElementById("trackCheckBtn");
      if (trkTitle) trkTitle.textContent = isSw ? "🔍 Fuatilia Maombi Yako (Hali ya NIN):" : "🔍 Track Your Application (NIN Status):";
      if (trkInp) trkInp.placeholder = isSw ? "Weka Namba ya Simu au Cheti..." : "Enter Phone or Birth Cert No...";
      if (trkBtn) trkBtn.textContent = isSw ? "Angalia Hali" : "Check Status";

      // Translate Step 3 Biometrics & Confirmation labels
      const pLbl = document.getElementById("photoLabel");
      const fpLbl = document.getElementById("fpLabel");
      const fpStat = document.getElementById("fpStatusText");
      const fpSub = document.getElementById("fpSubText");
      const sigLbl = document.getElementById("sigLabel");
      const confirmSpan = document.querySelector("#confirmTruthCheckbox + span");

      if (pLbl && !pLbl.textContent.includes("✔")) {
        pLbl.textContent = isSw ? "Picha ya Pasipoti (Pakia au Piga kwa Kamera *)" : "Applicant Passport Photo (Upload or Live Camera *)";
      }
      if (fpLbl) fpLbl.textContent = isSw ? "Skani ya Kidole Gumba (Kamera ya Moja kwa Moja *)" : "Biometric Fingerprint Scan (Live Camera Only *)";
      if (fpStat && !fpStat.textContent.includes("Captured")) {
        fpStat.textContent = isSw ? "Kidole Gumba Hakijachukuliwa Bado" : "Fingerprint Not Captured Yet";
      }
      if (fpSub) {
        fpSub.textContent = isSw ? "Chagua kamera ya mbele au nyuma na upige picha ya kidole gumba" : "Choose Front or Back camera and capture thumbprint";
      }
      if (sigLbl) sigLbl.textContent = isSw ? "Saini ya Kidijitali (Weka saini ndani ya kisanduku *)" : "Applicant Digital Signature (Sign inside the box *)";
      if (confirmSpan) {
        confirmSpan.innerHTML = isSw
          ? "<strong>UTHIBITISHO WA MWOMBAJI:</strong> Ninathibitisha kuwa taarifa zote nilizojaza na nyaraka nilizopakia ni sahihi na za kweli. Ninafahamu kuwa kutoa taarifa za uongo ni kosa la kisheria. *"
          : "<strong>APPLICANT DECLARATION:</strong> I confirm that all information provided and documents uploaded are true and accurate. I understand that providing false information is a legal offense. *";
      }
    }

    const oldLangClick = lBtn.onclick;
    lBtn.onclick = function () {
      if (typeof oldLangClick === "function") oldLangClick();
      syncFullTranslation(localStorage.getItem("nida_ui_lang") || "en");
    };

    syncFullTranslation(localStorage.getItem("nida_ui_lang") || "en");
  }
  // 15. REMOVE ALL PLACEHOLDER EXAMPLES FROM FORM INPUTS
  document.querySelectorAll("#regForm input").forEach(inp => {
    inp.placeholder = "";
    inp.removeAttribute("placeholder");
  });
  // =========================================================================
  // 16. LIVE AGE CALCULATOR, CITIZEN SELF-ID DOWNLOAD, DB FILTER & QR SCANNER
  // =========================================================================

  // A. LIVE AGE BADGE ON DOB INPUT
  const dobField = document.getElementById("dob");
  if (dobField && !document.getElementById("liveAgeBadge")) {
    const ageBadge = document.createElement("small");
    ageBadge.id = "liveAgeBadge";
    ageBadge.style.cssText = "display:block; margin-top:4px; font-weight:700; font-size:12px;";
    dobField.insertAdjacentElement("afterend", ageBadge);

    dobField.addEventListener("change", function () {
      if (!this.value) { ageBadge.textContent = ""; return; }
      const birth = new Date(this.value);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

      if (age >= 18) {
        ageBadge.style.color = "#047857";
        ageBadge.textContent = `✔ Umri: Miaka ${age} (Unastahili Kusajiliwa)`;
      } else {
        ageBadge.style.color = "#dc2626";
        ageBadge.textContent = `❌ Umri: Miaka ${age} (Lazima uwe na miaka 18+)`;
      }
    });
  }

  // B. CITIZEN SELF-SERVICE DIGITAL ID DOWNLOAD WHEN APPROVED
  window.downloadCitizenSelfId = function (citizenObj) {
    if (!citizenObj || !citizenObj.nin || citizenObj.nin === "PENDING-APPROVAL") return;
    const canvas = document.createElement("canvas");
    canvas.width = 680; canvas.height = 420;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, 680, 420);
    grad.addColorStop(0, "#ecfdf5"); grad.addColorStop(1, "#a7f3d0");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 680, 420);
    ctx.strokeStyle = "#047857"; ctx.lineWidth = 4; ctx.strokeRect(2, 2, 676, 416);

    ctx.fillStyle = "#065f46"; ctx.fillRect(0, 0, 680, 72);
    ctx.fillStyle = "#facc15"; ctx.fillRect(0, 72, 680, 5);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 20px Arial"; ctx.fillText("UNITED REPUBLIC OF TANZANIA", 24, 34);
    ctx.fillStyle = "#fde047"; ctx.font = "bold 12px Arial"; ctx.fillText("DIGITAL NATIONAL IDENTIFICATION CARD", 24, 56);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("FULL NAME:", 190, 112);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 18px Arial"; ctx.fillText(citizenObj.fullName || "---", 190, 136);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("DATE OF BIRTH & SEX:", 190, 172);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px Arial"; ctx.fillText(`${citizenObj.dob || "-"}   |   SEX: ${citizenObj.gender || "-"}`, 190, 194);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("RESIDENCE:", 190, 228);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 15px Arial"; ctx.fillText(`${citizenObj.district || ""}, ${citizenObj.region || ""}`, 190, 250);

    ctx.fillStyle = "#475569"; ctx.font = "bold 11px Arial"; ctx.fillText("NATIONAL IDENTIFICATION NUMBER (NIN):", 190, 286);
    ctx.fillStyle = "#065f46"; ctx.fillRect(190, 296, 340, 36);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 17px Courier New, monospace"; ctx.fillText(citizenObj.nin, 202, 320);

    if (typeof QRious !== "undefined") {
      const qrTmp = document.createElement("canvas");
      new QRious({ element: qrTmp, value: citizenObj.nin, size: 96, background: "#fff", foreground: "#0f172a" });
      ctx.drawImage(qrTmp, 555, 290, 96, 96);
    }

    const saveFile = () => {
      const a = document.createElement("a");
      a.download = `My_National_ID_${(citizenObj.fullName || "Citizen").replace(/\s+/g, "_")}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    if (citizenObj.photo && citizenObj.photo.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 24, 98, 142, 175); saveFile(); };
      img.onerror = saveFile;
      img.src = citizenObj.photo;
    } else { saveFile(); }
  };

  // Inject Download Button inside Citizen Tracker when NIN is approved
  const trkButton = document.getElementById("trackCheckBtn");
  if (trkButton) {
    const prevFn = trkButton.onclick;
    trkButton.onclick = async function () {
      if (typeof prevFn === "function") await prevFn();
      const out = document.getElementById("trackOutput");
      const codeEl = out?.querySelector("code");
      if (!codeEl) return;

      const approvedNin = codeEl.textContent.trim();
      const recs = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
      let person = recs.find(c => c && c.nin === approvedNin);

      if (!person) {
        try {
          const r = await fetch("https://firebaseio.com" + Date.now());
          const d = await r.json();
          const arr = d ? (Array.isArray(d) ? d.filter(Boolean) : Object.values(d).filter(Boolean)) : [];
          person = arr.find(c => c && c.nin === approvedNin);
        } catch (e) {}
      }

      if (person && !document.getElementById("citizenSelfDlBtn")) {
        const btnWrap = out.querySelector("div:last-child");
        if (btnWrap) {
          const dlBtn = document.createElement("button");
          dlBtn.type = "button";
          dlBtn.id = "citizenSelfDlBtn";
          dlBtn.textContent = "⬇ Pakua Kitambulisho Changu (PNG)";
          dlBtn.style.cssText = "background:#047857; color:#ffffff; border:none; padding:6px 12px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer;";
          dlBtn.onclick = () => window.downloadCitizenSelfId(person);
          btnWrap.insertBefore(dlBtn, btnWrap.firstChild);
        }
      }
    };
  }

  // C. DATABASE STATUS FILTER (ALL / APPROVED / PENDING)
  const filterBar = document.querySelector("#recordsTab .filter-bar");
  if (filterBar && !document.getElementById("dbStatusFilter")) {
    const statusSel = document.createElement("select");
    statusSel.id = "dbStatusFilter";
    statusSel.innerHTML = `
      <option value="ALL">Hali Zote (All Statuses)</option>
      <option value="APPROVED">✔ Waliopata NIN (Approved)</option>
      <option value="PENDING">⏳ Wanaosubiri NIN (Pending)</option>
    `;
    filterBar.appendChild(statusSel);

    statusSel.addEventListener("change", function () {
      const mode = this.value;
      document.querySelectorAll("#recordsTableBody tr").forEach(tr => {
        const isPending = tr.textContent.includes("PENDING-APPROVAL");
        if (mode === "ALL") tr.style.display = "";
        else if (mode === "APPROVED") tr.style.display = isPending ? "none" : "";
        else if (mode === "PENDING") tr.style.display = isPending ? "" : "none";
      });
    });
  }

  // D. LIVE CAMERA QR CODE SCANNER ON VERIFY TAB
  const verifyBox = document.querySelector("#verifyTab .verify-box");
  const searchBar = verifyBox?.querySelector(".search-bar");
  if (verifyBox && searchBar && !document.getElementById("liveQrScanBtn")) {
    const scanControls = document.createElement("div");
    scanControls.style.cssText = "margin-bottom:12px; display:flex; gap:10px; flex-wrap:wrap;";
    scanControls.innerHTML = `
      <button type="button" id="liveQrScanBtn" class="btn-cam">📷 Scan ID QR Code (Kamera)</button>
      <div id="qrLiveWrap" style="display:none; width:100%; background:#0f172a; padding:10px; border-radius:8px; text-align:center;">
        <video id="qrLiveVideo" autoplay playsinline style="width:100%; max-height:240px; border-radius:6px;"></video>
        <p style="color:#fde047; font-size:12px; margin:6px 0 0;">Elekeza QR Code ya Kitambulisho mbele ya kamera...</p>
      </div>
    `;
    searchBar.insertAdjacentElement("afterend", scanControls);

    let qrStream = null;
    let qrTimer = null;

    document.getElementById("liveQrScanBtn").onclick = async function () {
      const wrap = document.getElementById("qrLiveWrap");
      const vid = document.getElementById("qrLiveVideo");

      if (qrStream) {
        qrStream.getTracks().forEach(t => t.stop());
        qrStream = null;
        clearInterval(qrTimer);
        wrap.style.display = "none";
        this.textContent = "📷 Scan ID QR Code (Kamera)";
        return;
      }

      try {
        qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } });
        vid.srcObject = qrStream;
        wrap.style.display = "block";
        this.textContent = "✖ Funga Kamera ya QR";

        if ("BarcodeDetector" in window) {
          const detector = new BarcodeDetector({ formats: ["qr_code"] });
          qrTimer = setInterval(async () => {
            if (!vid.videoWidth) return;
            try {
              const codes = await detector.detect(vid);
              if (codes.length > 0 && codes.rawValue) {
                const scannedNin = codes.rawValue.trim();
                const ninInp = document.getElementById("searchNinInput");
                if (ninInp) ninInp.value = scannedNin;
                if (typeof window.verifyCitizen === "function") window.verifyCitizen();
                document.getElementById("liveQrScanBtn").click();
              }
            } catch (e) {}
          }, 500);
        } else {
          alert("Kamera imewashwa! Ikiwa kivinjari hakisomi QR kiotomatiki, andika namba ya NIN kwenye kisanduku cha juu.");
        }
      } catch (err) {
        alert("Imeshindwa kufungua kamera. Hakikisha umeruhusu Camera permission.");
      }
    };
  }
  // =========================================================================
  // 17. SIMULATED SMS OTP, 3-MIN ADMIN AUTO-LOCK & OFFICIAL PRINTABLE REPORT
  // =========================================================================

  // A. SIMULATED SMS OTP VERIFICATION FOR CITIZEN SUBMISSION
  const finalSubmitBtn = document.getElementById("submitFormBtn");
  if (finalSubmitBtn) {
    let otpVerifiedForPhone = "";

    finalSubmitBtn.addEventListener("click", function (e) {
      const isAdmin = sessionStorage.getItem("officer_logged_in") === "true";
      if (isAdmin) return; // Admin bypasses citizen OTP

      const phoneVal = (document.getElementById("phoneNumber")?.value || "").trim();
      if (!/^0\d{9}$/.test(phoneVal)) return; // Let existing phone validator handle invalid numbers

      if (otpVerifiedForPhone === phoneVal) return; // Already verified for this phone number

      e.stopImmediatePropagation();
      e.preventDefault();

      const generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
      const userEnteredOtp = prompt(
        `📲 UTHIBITISHO WA NAMBA YA SIMU (SMS OTP)\n\n` +
        `Namba ya uhakiki (OTP) imetumwa kwenda ${phoneVal}.\n` +
        `[Msimbo wako wa majaribio ni: ${generatedOtp}]\n\n` +
        `Tafadhali ingiza tarakimu hizo 4 hapa chini ili kukamilisha kutuma maombi:`
      );

      if (userEnteredOtp === null) return;
      if (userEnteredOtp.trim() === generatedOtp) {
        otpVerifiedForPhone = phoneVal;
        alert("✔ Namba ya simu imethibitishwa! Maombi yako yanatumwa sasa...");
        finalSubmitBtn.click(); // Proceed automatically to submit
      } else {
        alert("❌ Msimbo wa OTP si sahihi! Tafadhali jaribu tena.");
      }
    }, true);
  }

  // B. 3-MINUTE INACTIVITY AUTO-LOCK FOR ADMIN SESSION
  let adminIdleTimer = null;
  const THREE_MINUTES_MS = 3 * 60 * 1000;

  function resetAdminIdleTimer() {
    if (adminIdleTimer) clearTimeout(adminIdleTimer);
    if (sessionStorage.getItem("officer_logged_in") === "true") {
      adminIdleTimer = setTimeout(() => {
        if (sessionStorage.getItem("officer_logged_in") === "true") {
          if (typeof window.logoutOfficer === "function") {
            window.logoutOfficer();
          } else {
            sessionStorage.removeItem("officer_logged_in");
            document.body.classList.remove("is-admin");
          }
          alert("🔒 USALAMA WA MFUMO: Akaunti ya Admin imefungwa kiotomatiki baada ya dakika 3 bila kutumika.");
        }
      }, THREE_MINUTES_MS);
    }
  }

  ["mousemove", "mousedown", "keydown", "touchstart", "scroll"].forEach(evt => {
    document.addEventListener(evt, resetAdminIdleTimer, { passive: true });
  });
  resetAdminIdleTimer();

  // C. OFFICIAL PRINTABLE CITIZEN REPORT BUTTON IN DATABASE TAB
  const dbHeader = document.querySelector("#recordsTab .table-header");
  if (dbHeader && !document.getElementById("printOfficialReportBtn")) {
    const repBtn = document.createElement("button");
    repBtn.type = "button";
    repBtn.id = "printOfficialReportBtn";
    repBtn.textContent = "🖨 Chapisha Ripoti Rasmi";
    repBtn.style.cssText = "background:#0284c7; color:#ffffff; border:none; padding:7px 13px; border-radius:6px; font-weight:700; font-size:12.5px; cursor:pointer;";
    dbHeader.insertBefore(repBtn, dbHeader.lastElementChild);

    repBtn.onclick = function () {
      const all = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
      const regionFilter = document.getElementById("dbRegionFilter")?.value || "ALL";
      const filtered = regionFilter === "ALL" ? all : all.filter(c => c.region === regionFilter);

      if (filtered.length === 0) {
        return alert("Hakuna rekodi za kuchapisha kwenye mkoa uliochaguliwa!");
      }

      const males = filtered.filter(c => c.gender === "M").length;
      const females = filtered.filter(c => c.gender === "F").length;
      const approved = filtered.filter(c => c.nin !== "PENDING-APPROVAL").length;

      const win = window.open("", "_blank", "width=900,height=700");
      win.document.write(`
        <html>
        <head>
          <title>Ripoti Rasmi ya Usajili wa Vitambulisho vya Taifa</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; color: #0f172a; }
            .head { text-align: center; border-bottom: 3px solid #065f46; padding-bottom: 12px; margin-bottom: 18px; }
            .head h1 { margin: 0; font-size: 20px; color: #065f46; }
            .head p { margin: 4px 0 0; font-size: 13px; color: #475569; }
            .summary { display: flex; gap: 16px; margin-bottom: 18px; background: #f1f5f9; padding: 12px; border-radius: 8px; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
            th { background: #065f46; color: #ffffff; }
            tr:nth-child(even) { background: #f8fafc; }
            .footer { margin-top: 28px; display: flex; justify-content: space-between; font-size: 12.5px; }
          </style>
        </head>
        <body>
          <div class="head">
            <h1>JAMHURI YA MUUNGANO WA TANZANIA</h1>
            <p>MFUMO WA USAJILI WA VITAMBULISHO VYA TAIFA - RIPOTI RASMI YA WANANCHI</p>
            <p><b>Mkoa:</b> ${regionFilter === "ALL" ? "Mikoa Yote (Tanzania)" : regionFilter} &nbsp;|&nbsp; <b>Tarehe ya Ripoti:</b> ${new Date().toLocaleString()}</p>
          </div>
          <div class="summary">
            <div><b>Jumla ya Waliosajiliwa:</b> ${filtered.length}</div>
            <div><b>Wanaume (M):</b> ${males}</div>
            <div><b>Wanawake (F):</b> ${females}</div>
            <div><b>Waliopata NIN:</b> ${approved}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Namba ya NIN</th>
                <th>Jina Kamili</th>
                <th>Tarehe ya Kuzaliwa</th>
                <th>Jinsia</th>
                <th>Wilaya / Mkoa</th>
                <th>Namba ya Simu</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((c, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td><b>${c.nin}</b></td>
                  <td>${c.fullName}</td>
                  <td>${c.dob}</td>
                  <td>${c.gender}</td>
                  <td>${c.district}, ${c.region}</td>
                  <td>${c.phoneNumber || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="footer">
            <div>Imetolewa na: <b>Afisa Msimamizi wa Mfumo (System Admin)</b></div>
            <div>Sahihi &amp; Muhuri: ________________________</div>
          </div>
          <script>window.onload = function() { window.print(); };<\/script>
        </body>
        </html>
      `);
      win.document.close();
    };
  }
  // =========================================================================
  // 18. GUARANTEED MOBILE-TO-PC FIREBASE BRIDGE (LIGHTWEIGHT COMPRESSION)
  // =========================================================================
  const CLOUD_DB_URL = "https://nida-system-sixbeth-default-rtdb.firebaseio.com/citizens.json";

  // Helper to shrink mobile camera photos so they upload instantly even on slow 3G/4G
  function shrinkDataUrl(dataUrl, maxW, maxH) {
    return new Promise(resolve => {
      if (!dataUrl || !dataUrl.startsWith("data:image")) return resolve(dataUrl || "");
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = maxW;
        c.height = maxH;
        c.getContext("2d").drawImage(img, 0, 0, maxW, maxH);
        resolve(c.toDataURL("image/jpeg", 0.55));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  // Continuously pull latest mobile submissions onto PC Admin every 3 seconds
  async function syncMobileToPc() {
    try {
      const res = await fetch(`${CLOUD_DB_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const raw = await res.json();
      if (!raw || typeof raw !== "object") return;

      const cloudRecords = Array.isArray(raw)
        ? raw.filter(Boolean)
        : Object.entries(raw).map(([k, v]) => ({ ...v, _fbKey: k })).filter(Boolean);

      localStorage.setItem("nida_prototype_records", JSON.stringify(cloudRecords));

      if (typeof window.syncAndShowInbox === "function") {
        window.syncAndShowInbox();
      }
    } catch (e) {}
  }

  // Intercept Citizen Submit to guarantee direct Firebase POST with compressed photo
  const mainSubBtn = document.getElementById("submitFormBtn");
  if (mainSubBtn) {
    mainSubBtn.addEventListener("click", async function (e) {
      const isAdmin = sessionStorage.getItem("officer_logged_in") === "true";
      if (isAdmin) return; // Admin uses normal approval/registration flow

      // Stop older duplicate handlers so we run ONE clean, guaranteed cloud upload
      e.stopImmediatePropagation();
      e.preventDefault();

      const getV = id => (document.getElementById(id)?.value || "").trim();
      const fullName = getV("fullName").toUpperCase();
      const dob = getV("dob");
      const gender = getV("gender");
      const region = getV("region");
      const district = getV("district");

      if (!fullName || !dob || !gender || !region || !district) {
        return alert("Tafadhali jaza taarifa zote za msingi (Majina, Tarehe ya Kuzaliwa, Jinsia, Mkoa na Wilaya)!");
      }

      const cardPhotoEl = document.getElementById("cardPhoto");
      const rawPhoto = (cardPhotoEl && cardPhotoEl.src && cardPhotoEl.src.startsWith("data:image")) ? cardPhotoEl.src : "";
      if (!rawPhoto) {
        return alert("Tafadhali piga au chagua Picha ya Pasipoti kwanza!");
      }

      const chk = document.getElementById("confirmTruthCheckbox");
      if (chk && !chk.checked) {
        return alert("Tafadhali weka tiki ya kuthibitisha taarifa zako!");
      }

      mainSubBtn.disabled = true;
      mainSubBtn.textContent = "⏳ Inatuma kwenda kwa Admin...";

      try {
        const lightPhoto = await shrinkDataUrl(rawPhoto, 180, 210);
        const sigCanvas = document.getElementById("sigPad");
        const lightSig = sigCanvas ? await shrinkDataUrl(sigCanvas.toDataURL("image/png"), 200, 60) : "";

        const citizenPayload = {
          nin: "PENDING-APPROVAL",
          status: "PENDING",
          fullName,
          dob,
          gender,
          region,
          district,
          nationality: getV("nationality"),
          placeOfBirth: getV("placeOfBirth"),
          maritalStatus: getV("maritalStatus"),
          phoneNumber: getV("phoneNumber"),
          emailAddress: getV("emailAddress"),
          fatherName: getV("fatherName").toUpperCase(),
          motherName: getV("motherName").toUpperCase(),
          birthCertNo: getV("birthCertNo"),
          guardianNin: getV("guardianNin"),
          streetVillage: getV("streetVillage"),
          houseNumber: getV("houseNumber"),
          occupation: getV("occupation"),
          photo: lightPhoto,
          signature: lightSig,
          issueDate: new Date().toISOString().slice(0, 10),
          expiryDate: `${new Date().getFullYear() + 10}-${new Date().toISOString().slice(5, 10)}`,
          serial: "TZ-" + Math.floor(100000 + Math.random() * 900000),
          submittedFrom: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "Mobile Phone" : "Computer"
        };

        const response = await fetch(CLOUD_DB_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(citizenPayload)
        });

        if (!response.ok) {
          throw new Error(`Seva imekataa (Code: ${response.status}).`);
        }

        // Wipe form cleanly after confirmed cloud delivery
        if (typeof window.cancelEditMode === "function") {
          window.cancelEditMode();
        } else {
          document.getElementById("regForm")?.reset();
        }

        alert(`✔ MAOMBI YAMEFIKA KWA ADMIN!\nAsante ${fullName}, taarifa zako zimetumwa mtandaoni kikamilifu.`);
      } catch (err) {
        alert(`❌ IMESHINDWA KUTUMA KWENDA MTANDAONI:\n${err.message}\nHakikisha simu ina intaneti (Data/Wi-Fi).`);
      } finally {
        mainSubBtn.disabled = false;
        mainSubBtn.textContent = "SUBMIT APPLICATION";
      }
    }, true);
  }

  syncMobileToPc();
  setInterval(syncMobileToPc, 3000);
  // =========================================================================
  // 19. DIRECT ADMIN INBOX SYNC (FORCES MOBILE SUBMISSIONS TO SHOW IMMEDIATELY)
  // =========================================================================
  const DIRECT_FB = "https://nida-system-sixbeth-default-rtdb.firebaseio.com/citizens.json";

  async function loadLiveMobileInbox() {
    if (sessionStorage.getItem("officer_logged_in") !== "true") return;
    const box = document.getElementById("liveAdminInbox");
    if (!box) return;

    try {
      const r = await fetch(`${DIRECT_FB}?nocache=${Date.now()}`);
      if (!r.ok) return;
      const data = await r.json();
      if (!data || typeof data !== "object") return;

      const list = Array.isArray(data)
        ? data.filter(Boolean)
        : Object.entries(data).map(([k, v]) => ({ ...v, _fbKey: k })).filter(Boolean);

      localStorage.setItem("nida_prototype_records", JSON.stringify(list));

      // Hide the old duplicate yellow box
      document.querySelectorAll("#regForm > div").forEach(d => {
        if (d.textContent.includes("Pending Citizen Applications")) d.style.display = "none";
      });

      const pending = list
        .map((c, idx) => ({ c, idx }))
        .filter(x => x.c && (x.c.nin === "PENDING-APPROVAL" || x.c.status === "PENDING"));

      box.style.display = "block";
      if (pending.length === 0) {
        box.innerHTML = `<strong>📩 Maombi Mapya ya Wananchi (0):</strong> Hakuna maombi mapya yanayosubiri NIN kwa sasa.`;
      } else {
        box.innerHTML = `<strong>📩 Maombi Mapya ya Wananchi (${pending.length} Yanasubiri NIN):</strong>
          <div style="margin-top:8px; display:flex; flex-direction:column; gap:7px;">
            ${pending.map(({ c, idx }) => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; padding:9px 12px; border-radius:7px; border:1px solid #fcd34d;">
                <div>
                  <strong style="color:#0f172a;">${c.fullName}</strong><br>
                  <small style="color:#475569;">${c.district || ""}, ${c.region || ""} | Simu: ${c.phoneNumber || "-"}</small>
                </div>
                <button type="button" onclick="inspectAndApproveCitizen(${idx})" style="background:#047857; color:#ffffff; border:none; padding:8px 13px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer;">
                  🔍 Hakiki &amp; Generate NIN
                </button>
              </div>
            `).join("")}
          </div>`;
      }
    } catch (e) {}
  }

  loadLiveMobileInbox();
  setInterval(loadLiveMobileInbox, 3000);

})();
