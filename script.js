(function () {
  "use strict";

   const FB_CITIZENS = "https://firebaseio.com";
  const ADMIN_USER = "@mahenge";
  const ADMIN_PASS = "six@bml";

  const TZ_REGIONS = {
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

  const TZ_STREETS = {
    "Ulanga": ["Mahenge Mjini", "Vigoi", "Mwaya", "Ruaha", "Lupiro", "Ilonga", "Isongo", "Kituti", "Mbuga"],
    "Morogoro Municipal": ["Mbuyuni", "Mazimbu", "Kihonda", "Msamvu", "Mwembesongo", "Chamwino", "Bigwa", "Kingolwira", "Sabasaba", "Boma", "Mafiga"],
    "Morogoro DC": ["Mikese", "Ngerengere", "Mkuyuni", "Matombo", "Mvuha", "Mngazi", "Kinole", "Kiroka"],
    "Kilombero": ["Ifakara Mjini", "Kidatu", "Mang'ula", "Mlimba", "Mchombe", "Lumemo"],
    "Ifakara Town": ["Ifakara Mjini", "Viwanja Sitini", "Kibaoni", "Katindiuka", "Lipangalala", "Mlabani"],
    "Kilosa": ["Kilosa Mjini", "Mikumi", "Ruaha Mbuyuni", "Dumila", "Magole", "Kimamba", "Kidodi"],
    "Mvomero": ["Turiani", "Dakawa", "Mzumbe", "Mlali", "Melela", "Hembeti", "Sungaji"],
    "Malinyi": ["Malinyi Mjini", "Itete", "Ngoheranga", "Mtimbira", "Kilosa kwa Mpepo"],
    "Gairo": ["Gairo Mjini", "Rubeho", "Chagongwe", "Nongwe", "Madege"],
    "Ilala": ["Kariakoo", "Upanga", "Buguruni", "Tabata", "Segerea", "Ukonga", "Gongolamboto", "Kivukoni", "Chanika", "Pugu"],
    "Kinondoni": ["Sinza", "Mwenge", "Mikocheni", "Masaki", "Oysterbay", "Mwananyamala", "Magomeni", "Kijitonyama", "Kawe"],
    "Temeke": ["Mbagala", "Kurasini", "Chang'ombe", "Tandika", "Mtoni", "Chamazi", "Yombo Vituka", "Buza"],
    "Ubungo": ["Ubungo", "Kimara", "Mbezi Luis", "Manzese", "Mabibo", "Goba", "Kwembe", "Saranga"],
    "Kigamboni": ["Kigamboni Ferry", "Mjimwema", "Kibada", "Kisarawe II", "Somangila", "Tungi"],
    "Ngara": ["Ngara Mjini", "Rulenge", "Bugarama", "Kabanga", "Murusagamba", "Nyamiaga", "Rusumo"],
    "Mlele": ["Inyonga", "Ilela", "Utende", "Nsenkwa", "Kamsisi", "Ilunde"],
    "Mpanda Municipal": ["Mpanda Hotel", "Nsemulwa", "Kashaulili", "Makanyagio", "Shanwe", "Kawajense"]
  };

  let records = JSON.parse(localStorage.getItem("nida_prototype_records")) || [];
  let capturedPhotoData = "";
  let capturedFpData = "";
  let activeStream = null;
  let otpVerifiedPhone = "";

  const regionSel = document.getElementById("region");
  const dbRegionSel = document.getElementById("dbRegionFilter");
  const regNames = Object.keys(TZ_REGIONS).sort();
  regionSel.innerHTML = '<option value="" disabled selected>-- Select Region --</option>' + regNames.map(r => `<option value="${r}">${r}</option>`).join("");
  dbRegionSel.innerHTML = '<option value="ALL">All Regions</option>' + regNames.map(r => `<option value="${r}">${r}</option>`).join("");

  const distSel = document.getElementById("district");
  const streetSel = document.getElementById("streetVillage");
  const customStreetInp = document.getElementById("customStreetInput");

  regionSel.addEventListener("change", () => {
    const dList = TZ_REGIONS[regionSel.value] || [];
    distSel.innerHTML = '<option value="" disabled selected>-- Select District --</option>' + dList.map(d => `<option value="${d}">${d}</option>`).join("");
    streetSel.innerHTML = '<option value="" disabled selected>-- Select District First --</option>';
    customStreetInp.style.display = "none";
  });

  distSel.addEventListener("change", () => {
    const dName = distSel.value;
    const sList = TZ_STREETS[dName] || [`${dName} Mjini / Kati`, `${dName} Mashariki`, `${dName} Magharibi`, `${dName} Kaskazini`, `${dName} Kusini`, "Majengo", "Sokoni", "Miembeni"];
    streetSel.innerHTML = '<option value="" disabled selected>-- Select Street / Village --</option>' + sList.map(s => `<option value="${s}">${s}</option>`).join("") + '<option value="__OTHER__">➕ Other Street / Village (Type...)</option>';
    customStreetInp.style.display = "none";
    customStreetInp.value = "";
  });

  streetSel.addEventListener("change", () => {
    customStreetInp.style.display = streetSel.value === "__OTHER__" ? "block" : "none";
    if (streetSel.value === "__OTHER__") customStreetInp.focus();
  });

  const dobInp = document.getElementById("dob");
  const tNow = new Date();
  dobInp.max = new Date(tNow.getFullYear() - 18, tNow.getMonth(), tNow.getDate()).toISOString().split("T")[0];
  dobInp.addEventListener("change", () => {
    const badge = document.getElementById("liveAgeBadge");
    if (!dobInp.value) { badge.textContent = ""; return; }
    const b = new Date(dobInp.value);
    let age = tNow.getFullYear() - b.getFullYear();
    const m = tNow.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && tNow.getDate() < b.getDate())) age--;
    badge.style.color = age >= 18 ? "#047857" : "#dc2626";
    badge.textContent = age >= 18 ? `✔ Age: ${age} Years (Eligible)` : `❌ Age: ${age} Years (Must be 18+)`;
  });

  const phoneInp = document.getElementById("phoneNumber");
  phoneInp.addEventListener("input", () => { phoneInp.value = phoneInp.value.replace(/\D/g, "").slice(0, 10); });
  const certInp = document.getElementById("birthCertNo");
  certInp.addEventListener("input", () => { certInp.value = certInp.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12); });

  function goToStep(s) {
    [1, 2, 3].forEach(n => {
      document.getElementById(`step${n}`).style.display = n === s ? "block" : "none";
      const p = document.getElementById(`pill${n}`);
      p.classList.remove("active", "done");
      if (n === s) p.classList.add("active");
      else if (n < s) p.classList.add("done");
    });
  }

  document.getElementById("nextStepBtn").onclick = () => {
    const nameWords = document.getElementById("fullName").value.trim().split(/\s+/).filter(Boolean);
    if (nameWords.length < 3) return alert("❌ Please enter ALL THREE names (e.g. ABDALAH JUMA SAID).");
    if (!dobInp.value) return alert("❌ Please select Date of Birth.");
    if (!document.getElementById("gender").value) return alert("❌ Please select Gender.");
    if (!document.getElementById("placeOfBirth").value.trim()) return alert("❌ Please enter Place of Birth.");
    if (!document.getElementById("maritalStatus").value) return alert("❌ Please select Marital Status.");
    if (!/^0\d{9}$/.test(phoneInp.value.trim())) return alert("❌ Phone number must start with 0 and have 10 digits.");
    goToStep(2);
  };
  document.getElementById("prevStepBtn").onclick = () => goToStep(1);

  document.getElementById("nextStep2Btn").onclick = () => {
    const appWords = document.getElementById("fullName").value.trim().split(/\s+/).filter(Boolean);
    const dadWords = document.getElementById("fatherName").value.trim().split(/\s+/).filter(Boolean);
    const momWords = document.getElementById("motherName").value.trim().split(/\s+/).filter(Boolean);
    if (dadWords.length < 3) return alert("❌ Please enter Father's ALL THREE names.");
    if (momWords.length < 3) return alert("❌ Please enter Mother's ALL THREE names.");

    const appSurnames = [appWords[1].toUpperCase(), appWords[appWords.length - 1].toUpperCase()];
    const dadMatch = [dadWords[0].toUpperCase(), dadWords[dadWords.length - 1].toUpperCase()];
    const momLast = momWords[momWords.length - 1].toUpperCase();
    if (!appSurnames.some(n => dadMatch.includes(n)) && !appSurnames.includes(momLast)) {
      return alert(`❌ NAMES DO NOT MATCH:\nYour name (${appWords.join(" ").toUpperCase()}) does not match Father (${dadWords.join(" ").toUpperCase()}) or Mother (${momWords.join(" ").toUpperCase()}).`);
    }

    const cert = certInp.value.trim();
    const guard = document.getElementById("guardianNin").value.trim();
    if (!cert && !guard) return alert("❌ Enter Birth Certificate Number or Parent/Guardian NIN.");
    if (cert && cert.length < 6) return alert("❌ Birth Certificate Number must be 6 to 12 characters.");
    if (!regionSel.value || !distSel.value) return alert("❌ Please select Region and District.");
    const stVal = streetSel.value === "__OTHER__" ? customStreetInp.value.trim() : streetSel.value;
    if (!stVal) return alert("❌ Please select or type Street / Village.");
    if (!document.getElementById("houseNumber").value.trim()) return alert("❌ Please enter House Number.");
    if (!document.getElementById("occupation").value.trim()) return alert("❌ Please enter Occupation.");
    goToStep(3);
  };
  document.getElementById("prevStep3Btn").onclick = () => goToStep(2);

  function stopCamera() {
    if (activeStream) { activeStream.getTracks().forEach(t => t.stop()); activeStream = null; }
    document.getElementById("photoCamBox").style.display = "none";
    document.getElementById("fpCamBox").style.display = "none";
  }

  function shrinkImage(srcData, w, h) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", 0.6));
      };
      img.onerror = () => resolve(srcData);
      img.src = srcData;
    });
  }

  document.getElementById("photoInput").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ev => {
      capturedPhotoData = await shrinkImage(ev.target.result, 180, 210);
      document.getElementById("photoLabel").textContent = "✔ Passport Photo Uploaded!";
      const pImg = document.getElementById("cardPhoto");
      pImg.src = capturedPhotoData; pImg.style.display = "block";
      document.getElementById("photoPlaceholder").style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("openPhotoCamBtn").onclick = async () => {
    stopCamera();
    try {
      activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: document.getElementById("photoCamFacing").value } });
      document.getElementById("photoVideo").srcObject = activeStream;
      document.getElementById("photoCamBox").style.display = "block";
    } catch (e) { alert("Camera permission denied or unavailable."); }
  };

  document.getElementById("snapPhotoBtn").onclick = () => {
    const v = document.getElementById("photoVideo"), c = document.createElement("canvas");
    c.width = 180; c.height = 210; c.getContext("2d").drawImage(v, 0, 0, 180, 210);
    capturedPhotoData = c.toDataURL("image/jpeg", 0.65);
    document.getElementById("photoLabel").textContent = "✔ Passport Photo Captured!";
    const pImg = document.getElementById("cardPhoto");
    pImg.src = capturedPhotoData; pImg.style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
    stopCamera();
  };
  document.getElementById("closePhotoCamBtn").onclick = stopCamera;

  document.getElementById("openFpCamBtn").onclick = async () => {
    stopCamera();
    try {
      activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: document.getElementById("fpCamFacing").value } });
      document.getElementById("fpVideo").srcObject = activeStream;
      document.getElementById("fpCamBox").style.display = "block";
    } catch (e) { alert("Camera permission denied or unavailable."); }
  };

  document.getElementById("snapFpBtn").onclick = () => {
    const v = document.getElementById("fpVideo"), c = document.createElement("canvas");
    c.width = 120; c.height = 120; c.getContext("2d").drawImage(v, 0, 0, 120, 120);
    capturedFpData = c.toDataURL("image/jpeg", 0.6);
    document.getElementById("fpStatusText").textContent = "✔ Fingerprint Captured";
    document.getElementById("fpPreviewMini").innerHTML = `<img src="${capturedFpData}" style="width:100%;height:100%;object-fit:cover;">`;
    stopCamera();
  };
  document.getElementById("closeFpCamBtn").onclick = stopCamera;

  const sigCanvas = document.getElementById("sigPad"), sigCtx = sigCanvas.getContext("2d");
  sigCtx.lineWidth = 2; sigCtx.strokeStyle = "#0f172a";
  let drawing = false, hasSigned = false;
  const getPos = e => {
    const r = sigCanvas.getBoundingClientRect();
    return { x: (e.touches ? e.touches[0].clientX : e.clientX) - r.left, y: (e.touches ? e.touches[0].clientY : e.clientY) - r.top };
  };
  sigCanvas.addEventListener("mousedown", e => { drawing = true; const p = getPos(e); sigCtx.beginPath(); sigCtx.moveTo(p.x, p.y); });
  sigCanvas.addEventListener("mousemove", e => { if (!drawing) return; hasSigned = true; const p = getPos(e); sigCtx.lineTo(p.x, p.y); sigCtx.stroke(); });
  window.addEventListener("mouseup", () => { drawing = false; });
  sigCanvas.addEventListener("touchstart", e => { e.preventDefault(); drawing = true; const p = getPos(e); sigCtx.beginPath(); sigCtx.moveTo(p.x, p.y); });
  sigCanvas.addEventListener("touchmove", e => { e.preventDefault(); if (!drawing) return; hasSigned = true; const p = getPos(e); sigCtx.lineTo(p.x, p.y); sigCtx.stroke(); });
  sigCanvas.addEventListener("touchend", () => { drawing = false; });

  function clearFormCompletely() {
    document.getElementById("regForm").reset();
    capturedPhotoData = ""; capturedFpData = ""; hasSigned = false; otpVerifiedPhone = "";
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    document.getElementById("fpStatusText").textContent = "Fingerprint Not Captured Yet";
    document.getElementById("fpPreviewMini").innerHTML = "No Scan";
    document.getElementById("liveAgeBadge").textContent = "";
    document.getElementById("cardPhoto").style.display = "none";
    document.getElementById("photoPlaceholder").style.display = "block";
    goToStep(1);
  }
  document.getElementById("clearSigBtn").onclick = () => { sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height); hasSigned = false; };
  document.getElementById("clearFormBtn1").onclick = () => { if (confirm("Clear all form inputs?")) clearFormCompletely(); };
  document.getElementById("regForm").addEventListener("submit", async e => {
    e.preventDefault();
    if (!capturedPhotoData) return alert("❌ Please upload or capture Passport Photo.");
    if (!capturedFpData) return alert("❌ Please capture Thumbprint via camera.");
    if (!hasSigned) return alert("❌ Please sign inside the signature box.");
    if (!document.getElementById("confirmTruthCheckbox").checked) return alert("❌ Please check the confirmation box.");
 
    const ph = phoneInp.value.trim();
    const cert = certInp.value.trim();
    if (records.some(c => c.phoneNumber === ph)) return alert(`❌ Phone ${ph} is already registered!`);
    if (cert && records.some(c => c.birthCertNo && c.birthCertNo.toLowerCase() === cert.toLowerCase())) {
      return alert(`❌ Birth Certificate ${cert} is already registered!`);
    }

    if (otpVerifiedPhone !== ph) {
      const code = String(Math.floor(1000 + Math.random() * 9000));
      const entered = prompt(`📲 SMS OTP VERIFICATION\n\nVerification code sent to ${ph}.\n[Test OTP Code: ${code}]\n\nEnter the 4 digits below:`);
      if (entered === null) return;
      if (entered.trim() !== code) return alert("❌ Incorrect OTP code. Try again.");
      otpVerifiedPhone = ph;
    }

    const subBtn = document.getElementById("submitFormBtn");
    subBtn.disabled = true;
    subBtn.textContent = "⏳ Submitting...";

    const stVal = streetSel.value === "__OTHER__" ? customStreetInp.value.trim() : streetSel.value;
    const payload = {
      nin: "PENDING-APPROVAL",
      status: "PENDING",
      fullName: document.getElementById("fullName").value.trim().toUpperCase(),
      nationality: document.getElementById("nationality").value,
      dob: dobInp.value,
      gender: document.getElementById("gender").value,
      placeOfBirth: document.getElementById("placeOfBirth").value.trim(),
      maritalStatus: document.getElementById("maritalStatus").value,
      phoneNumber: ph,
      emailAddress: document.getElementById("emailAddress").value.trim(),
      fatherName: document.getElementById("fatherName").value.trim().toUpperCase(),
      motherName: document.getElementById("motherName").value.trim().toUpperCase(),
      birthCertNo: cert,
      guardianNin: document.getElementById("guardianNin").value.trim(),
      region: regionSel.value,
      district: distSel.value,
      streetVillage: stVal,
      houseNumber: document.getElementById("houseNumber").value.trim(),
      occupation: document.getElementById("occupation").value.trim(),
      photo: capturedPhotoData,
      signature: sigCanvas.toDataURL("image/png"),
      issueDate: new Date().toISOString().slice(0, 10),
      expiryDate: `${new Date().getFullYear() + 10}-${new Date().toISOString().slice(5, 10)}`,
      serial: "TZ-" + Math.floor(100000 + Math.random() * 900000)
    };

    try {
      const res = await fetch(`${FB_CITIZENS}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Server error " + res.status);
      await syncFromFirebase();
      clearFormCompletely();
      alert(`✔ APPLICATION SUBMITTED!\nThank you ${payload.fullName}, your application is now pending Admin verification.`);
    } catch (err) {
      alert("❌ Network error submitting application: " + err.message);
    } finally {
      subBtn.disabled = false;
      subBtn.textContent = "SUBMIT APPLICATION";
    }
  });

  async function syncFromFirebase() {
    try {
      const res = await fetch(`${FB_CITIZENS}.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const raw = await res.json();
      records = !raw ? [] : (
        Array.isArray(raw)
          ? raw.map((v, i) => v ? { ...v, _fbKey: String(i) } : null).filter(Boolean)
          : Object.entries(raw).map(([k, v]) => v ? { ...v, _fbKey: k } : null).filter(Boolean)
      );
      localStorage.setItem("nida_prototype_records", JSON.stringify(records));
      renderAllAdminViews();
    } catch (e) {}
  }

  function generateNinNumber(dobStr) {
    const cleanDob = (dobStr || "2000-01-01").replace(/-/g, "");
    const r1 = String(Math.floor(10000 + Math.random() * 89999));
    const r2 = String(Math.floor(10000 + Math.random() * 89999));
    const r3 = String(Math.floor(10 + Math.random() * 89));
    return `${cleanDob}-${r1}-${r2}-${r3}`;
  }

  function renderCardPreview(c) {
    document.getElementById("cardName").textContent = c.fullName || "---";
    document.getElementById("cardDob").textContent = c.dob || "--/--/----";
    document.getElementById("cardGender").textContent = c.gender || "-";
    document.getElementById("cardLocation").textContent = `${c.district || ""}, ${c.region || ""}`;
    document.getElementById("cardNin").textContent = c.nin || "PENDING-APPROVAL";
    document.getElementById("cardIssueDate").textContent = c.issueDate || "--/--/----";
    document.getElementById("cardExpiryDate").textContent = c.expiryDate || "--/--/----";
    document.getElementById("cardSerial").textContent = c.serial || "TZ-000000";
    document.getElementById("cardMrz").textContent = `IDTZ<${(c.nin || "").replace(/-/g, "")}<<<<<<<<<<<`;
    const pImg = document.getElementById("cardPhoto");
    if (c.photo && c.photo.startsWith("data:image")) {
      pImg.src = c.photo; pImg.style.display = "block";
      document.getElementById("photoPlaceholder").style.display = "none";
    }
    const sImg = document.getElementById("cardSigImg");
    if (c.signature && c.signature.startsWith("data:image")) {
      sImg.src = c.signature; sImg.style.display = "block";
      document.getElementById("sigPlaceholderText").style.display = "none";
    }
    if (typeof QRious !== "undefined" && c.nin && c.nin !== "PENDING-APPROVAL") {
      new QRious({ element: document.getElementById("qrCanvas"), value: c.nin, size: 74, background: "#fff", foreground: "#0f172a" });
    }
  }

  window.inspectCitizen = function (idx) {
    const c = records[idx];
    if (!c) return;
    renderCardPreview(c);
    const revBox = document.getElementById("adminReviewBox");
    const revDetails = document.getElementById("reviewDetailsContent");
    const appBtn = document.getElementById("confirmGenerateNinBtn");
    revBox.style.display = "block";
    revDetails.innerHTML = `<b>Full Name:</b> ${c.fullName}<br><b>DOB / Gender:</b> ${c.dob} (${c.gender})<br><b>Parents:</b> Father: ${c.fatherName || "-"} | Mother: ${c.motherName || "-"}<br><b>Residence:</b> ${c.streetVillage || ""}, ${c.district || ""}, ${c.region || ""}<br><b>Phone / Cert:</b> ${c.phoneNumber || "-"} | ${c.birthCertNo || "-"}`;
    revBox.scrollIntoView({ behavior: "smooth", block: "center" });

    appBtn.onclick = async () => {
      appBtn.disabled = true;
      appBtn.textContent = "⏳ Generating NIN...";
      const newNin = generateNinNumber(c.dob);
      const issueDate = new Date().toISOString().slice(0, 10);
      const expiryDate = `${new Date().getFullYear() + 10}-${new Date().toISOString().slice(5, 10)}`;
      if (c._fbKey) {
        await fetch(`${FB_CITIZENS}/${c._fbKey}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nin: newNin, status: "APPROVED", issueDate, expiryDate })
        });
      }
      records[idx] = { ...c, nin: newNin, status: "APPROVED", issueDate, expiryDate };
      localStorage.setItem("nida_prototype_records", JSON.stringify(records));
      renderCardPreview(records[idx]);
      revBox.style.display = "none";
      appBtn.disabled = false;
      appBtn.textContent = "⚡ HAKIKI & GENERATE OFFICIAL NIN NOW";
      addAuditLog(`Issued NIN ${newNin} to ${c.fullName}`);
      renderAllAdminViews();
      alert(`✔ OFFICIAL NIN GENERATED!\n\nCitizen: ${c.fullName}\nNIN: ${newNin}`);
    };
  };

  window.deleteCitizenRecord = async function (idx) {
    const c = records[idx];
    if (!c || !confirm(`Delete record for ${c.fullName}?`)) return;
    if (c._fbKey) await fetch(`${FB_CITIZENS}/${c._fbKey}.json`, { method: "DELETE" });
    addAuditLog(`Deleted record: ${c.fullName}`);
    records.splice(idx, 1);
    localStorage.setItem("nida_prototype_records", JSON.stringify(records));
    renderAllAdminViews();
  };

  function renderAllAdminViews() {
    const approved = records.filter(c => c.nin && c.nin !== "PENDING-APPROVAL");
    document.getElementById("statTotal").textContent = approved.length;
    document.getElementById("statMale").textContent = approved.filter(c => c.gender === "M").length;
    document.getElementById("statFemale").textContent = approved.filter(c => c.gender === "F").length;

    const regCount = {};
    let topReg = "None", maxR = 0;
    approved.forEach(c => {
      regCount[c.region] = (regCount[c.region] || 0) + 1;
      if (regCount[c.region] > maxR) { maxR = regCount[c.region]; topReg = `${c.region} (${maxR})`; }
    });
    document.getElementById("statTopRegion").textContent = topReg;

    const inbox = document.getElementById("liveAdminInbox");
    const pending = records.map((c, idx) => ({ c, idx })).filter(x => x.c.nin === "PENDING-APPROVAL");
    if (pending.length === 0) {
      inbox.innerHTML = `<strong>📩 Maombi Mapya ya Wananchi (0):</strong> Hakuna maombi yanayosubiri NIN.`;
    } else {
      inbox.innerHTML = `<strong>📩 Maombi Mapya ya Wananchi (${pending.length} Yanasubiri NIN):</strong><div style="margin-top:8px;display:flex;flex-direction:column;gap:7px;">` +
        pending.map(({ c, idx }) => `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;background:#fff;padding:9px 12px;border-radius:7px;border:1px solid #fcd34d;"><div><strong>${c.fullName}</strong><br><small>${c.district}, ${c.region} | Tel: ${c.phoneNumber}</small></div><div style="display:flex;gap:6px;"><button type="button" onclick="inspectCitizen(${idx})" style="background:#047857;color:#fff;border:none;padding:7px 11px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">🔍 Hakiki &amp; Generate NIN</button><button type="button" onclick="deleteCitizenRecord(${idx})" style="background:#dc2626;color:#fff;border:none;padding:7px 10px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">🗑 Futa</button></div></div>`).join("") + `</div>`;
    }

    const q = (document.getElementById("dbSearchInput").value || "").toLowerCase();
    const rf = dbRegionSel.value;
    const sf = document.getElementById("dbStatusFilter").value;
    document.getElementById("recordsTableBody").innerHTML = records.map((c, idx) => ({ c, idx }))
      .filter(({ c }) => (rf === "ALL" || c.region === rf) && (sf === "ALL" || (sf === "APPROVED" ? c.nin !== "PENDING-APPROVAL" : c.nin === "PENDING-APPROVAL")) && (!q || `${c.fullName} ${c.nin} ${c.phoneNumber}`.toLowerCase().includes(q)))
      .map(({ c, idx }) => `<tr><td><strong>${c.nin}</strong></td><td>${c.fullName}</td><td>${c.dob}</td><td>${c.gender}</td><td>${c.district}, ${c.region}</td><td>${c.phoneNumber || "-"}</td><td><button type="button" onclick="inspectCitizen(${idx})" style="background:#0284c7;color:#fff;border:none;padding:5px 8px;border-radius:4px;font-size:11px;cursor:pointer;">View / NIN</button> <button type="button" onclick="deleteCitizenRecord(${idx})" style="background:#dc2626;color:#fff;border:none;padding:5px 8px;border-radius:4px;font-size:11px;cursor:pointer;">Delete</button></td></tr>`).join("");
  }

  document.getElementById("dbSearchInput").addEventListener("input", renderAllAdminViews);
  dbRegionSel.addEventListener("change", renderAllAdminViews);
  document.getElementById("dbStatusFilter").addEventListener("change", renderAllAdminViews);

  document.getElementById("trackCheckBtn").onclick = async () => {
    const q = document.getElementById("trackQueryInput").value.trim().toLowerCase();
    const out = document.getElementById("trackOutput");
    if (!q) return alert("Enter Phone Number or Birth Certificate Number.");
    out.style.display = "block";
    out.innerHTML = "⏳ Searching...";
    await syncFromFirebase();
    const match = records.find(c => (c.phoneNumber && c.phoneNumber.toLowerCase() === q) || (c.birthCertNo && c.birthCertNo.toLowerCase() === q) || (c.fullName && c.fullName.toLowerCase() === q));
    if (!match) {
      out.innerHTML = `<div style="background:#fef2f2;color:#991b1b;padding:8px;border-radius:6px;">❌ No application found for "${q}".</div>`;
    } else if (match.nin && match.nin !== "PENDING-APPROVAL") {
      out.innerHTML = `<div style="background:#ecfdf5;border:1px solid #10b981;color:#065f46;padding:10px;border-radius:6px;"><strong>✔ APPROVED: ${match.fullName}</strong><br>Official NIN: <code style="font-size:14px;font-weight:900;">${match.nin}</code></div><div style="margin-top:8px;display:flex;gap:8px;justify-content:flex-end;"><button type="button" id="dlSelfIdBtn" style="background:#047857;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">⬇ Download My ID (PNG)</button><button type="button" id="closeTrkBtn" style="background:#dc2626;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">✖ Close</button></div>`;
      document.getElementById("dlSelfIdBtn").onclick = () => { renderCardPreview(match); document.getElementById("downloadPngBtn").click(); };
      document.getElementById("closeTrkBtn").onclick = () => { out.style.display = "none"; document.getElementById("trackQueryInput").value = ""; };
    } else {
      out.innerHTML = `<div style="background:#fefce8;border:1px solid #eab308;color:#854d0e;padding:10px;border-radius:6px;">⏳ <strong>${match.fullName}</strong>, your application is still <strong>PENDING APPROVAL</strong>.</div><div style="margin-top:8px;display:flex;justify-content:flex-end;"><button type="button" id="closeTrkBtn" style="background:#475569;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;">✖ Close</button></div>`;
      document.getElementById("closeTrkBtn").onclick = () => { out.style.display = "none"; document.getElementById("trackQueryInput").value = ""; };
    }
  };

  document.getElementById("verifyBtn").onclick = () => {
    const val = document.getElementById("searchNinInput").value.trim();
    const resDiv = document.getElementById("verifyResult");
    const c = records.find(x => x.nin === val);
    resDiv.innerHTML = !c
      ? `<div style="background:#fef2f2;border:1px solid #dc2626;color:#991b1b;padding:12px;border-radius:8px;">❌ INVALID OR UNREGISTERED NIN: <b>${val}</b></div>`
      : `<div style="background:#ecfdf5;border:1px solid #059669;color:#065f46;padding:12px;border-radius:8px;"><strong>✔ VERIFIED CITIZEN IDENTITY</strong><br>Name: <b>${c.fullName}</b> | DOB: <b>${c.dob}</b> | Gender: <b>${c.gender}</b><br>Residence: <b>${c.district}, ${c.region}</b> | NIN: <b>${c.nin}</b></div>`;
  };

  document.getElementById("flipCardBtn").onclick = () => {
    const f = document.getElementById("cardFront"), b = document.getElementById("cardBack");
    const showF = f.style.display === "none";
    f.style.display = showF ? "block" : "none";
    b.style.display = showF ? "none" : "block";
  };

  document.getElementById("downloadPngBtn").onclick = () => {
    const nin = document.getElementById("cardNin").textContent.trim();
    if (!nin || nin.startsWith("0000") || nin === "PENDING-APPROVAL") return alert("Generate an official NIN first!");
    const name = document.getElementById("cardName").textContent;
    const c = document.createElement("canvas");
    c.width = 680; c.height = 420;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#d1fae5"; ctx.fillRect(0, 0, 680, 420);
    ctx.fillStyle = "#065f46"; ctx.fillRect(0, 0, 680, 70);
    ctx.fillStyle = "#fff"; ctx.font = "bold 20px Arial"; ctx.fillText("UNITED REPUBLIC OF TANZANIA - NATIONAL ID", 24, 42);
    ctx.fillStyle = "#0f172a"; ctx.font = "bold 18px Arial"; ctx.fillText(`NAME: ${name}`, 30, 125);
    ctx.fillText(`DOB / SEX: ${document.getElementById("cardDob").textContent} | ${document.getElementById("cardGender").textContent}`, 30, 165);
    ctx.fillText(`RESIDENCE: ${document.getElementById("cardLocation").textContent}`, 30, 205);
    ctx.fillStyle = "#065f46"; ctx.fillRect(30, 240, 380, 40);
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px monospace"; ctx.fillText(nin, 42, 266);
    ctx.drawImage(document.getElementById("qrCanvas"), 540, 290, 100, 100);
    const a = document.createElement("a");
    a.download = `National_ID_${name.replace(/\s+/g, "_")}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  document.getElementById("exportCsvBtn").onclick = () => {
    const csv = "NIN,Full Name,DOB,Gender,Region,District,Phone\n" +
      records.map(c => `"${c.nin}","${c.fullName}","${c.dob}","${c.gender}","${c.region}","${c.district}","${c.phoneNumber}"`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "Citizens_Database.csv";
    a.click();
  };
  document.getElementById("printOfficialReportBtn").onclick = () => window.print();

  function addAuditLog(msg) {
    const logs = JSON.parse(localStorage.getItem("nida_audit_logs")) || [];
    logs.unshift({ time: new Date().toLocaleString(), msg });
    localStorage.setItem("nida_audit_logs", JSON.stringify(logs.slice(0, 40)));
    const box = document.getElementById("liveAuditTrailBox");
    if (box) {
      box.innerHTML = `<h3>🛡️ Security Audit Log (${logs.length})</h3>` +
        logs.map(l => `<div style="font-size:12px;padding:4px 0;border-bottom:1px dashed #cbd5e1;"><b>[${l.time}]</b> ${l.msg}</div>`).join("");
    }
  }

  let idleTimer = null;
  function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (sessionStorage.getItem("officer_logged_in") === "true") {
      idleTimer = setTimeout(() => {
        setAdminState(false);
        alert("🔒 Session locked automatically after 3 minutes of inactivity.");
      }, 3 * 60 * 1000);
    }
  }
  ["mousemove", "keydown", "click", "touchstart"].forEach(ev => document.addEventListener(ev, resetIdleTimer, { passive: true }));

  function setAdminState(loggedIn) {
    if (loggedIn) {
      sessionStorage.setItem("officer_logged_in", "true");
      document.body.classList.add("is-admin");
      document.getElementById("openAdminLoginBtn").style.display = "none";
      document.getElementById("officerSessionBar").style.display = "flex";
      resetIdleTimer();
      syncFromFirebase();
    } else {
      sessionStorage.removeItem("officer_logged_in");
      document.body.classList.remove("is-admin");
      document.getElementById("openAdminLoginBtn").style.display = "inline-block";
      document.getElementById("officerSessionBar").style.display = "none";
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      document.getElementById("registerTab").classList.add("active");
    }
  }

  document.getElementById("openAdminLoginBtn").onclick = () => { document.getElementById("adminLoginModal").style.display = "grid"; };
  document.getElementById("closeLoginModalBtn").onclick = () => { document.getElementById("adminLoginModal").style.display = "none"; };
  document.getElementById("logoutBtn").onclick = () => setAdminState(false);
  document.getElementById("confirmLoginBtn").onclick = () => {
    if (document.getElementById("loginUser").value.trim() === ADMIN_USER && document.getElementById("loginPass").value === ADMIN_PASS) {
      document.getElementById("adminLoginModal").style.display = "none";
      document.getElementById("loginErrorMsg").style.display = "none";
      setAdminState(true);
      addAuditLog("Admin logged in (@mahenge)");
    } else {
      const err = document.getElementById("loginErrorMsg");
      err.textContent = "❌ Invalid Admin Username or Password.";
      err.style.display = "block";
    }
  };

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    };
  });

  let lang = "en";
  document.getElementById("langToggleBtn").onclick = function () {
    lang = lang === "en" ? "sw" : "en";
    const sw = lang === "sw";
    this.textContent = sw ? "🇹🇿 Kiswahili (Active)" : "🇬🇧 English (Active)";
    document.getElementById("mainTitle").textContent = sw ? "MFUMO WA USAJILI WA VITAMBULISHO VYA TAIFA" : "NATIONAL ID REGISTRATION SYSTEM";
    document.getElementById("formTitle").textContent = sw ? "Fomu ya Maombi ya Kitambulisho cha Taifa (Miaka 18+)" : "Citizen National ID Application Form (18+ Eligible)";
    document.getElementById("trackerTitle").textContent = sw ? "🔍 Fuatilia Maombi Yako (Hali ya NIN):" : "🔍 Track Your Application (NIN Status):";
    document.getElementById("trackCheckBtn").textContent = sw ? "Angalia Hali" : "Check Status";
  };

  if (sessionStorage.getItem("officer_logged_in") === "true") setAdminState(true);
  syncFromFirebase();
  setInterval(syncFromFirebase, 4000);
})();
