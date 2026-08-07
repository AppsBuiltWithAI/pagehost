/* global React, PoofPart1 */
const { useState, useEffect, useRef } = React;
const { Reveal, ArrowRight, Plus, Logo } = PoofPart1;

/* ============= IDEA BOX ============= */
function IdeaBox({ value, onChange, pulse, onSubmit, cta = "Build it" }) {
  const submit = () => { if (value.trim().length > 3) onSubmit(value.trim()); };
  return (
    <div className={"prompt-card" + (pulse ? " pulse" : "")}>
      <span className="prompt-tag">YOUR IDEA</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
        placeholder='Describe the app you want — like "a booking page for my bakery"'></textarea>
      <div className="prompt-bar">
        <div className="prompt-icons"></div>
        <button className="btn btn-coral" onClick={submit} disabled={value.trim().length < 4}>{cta} <ArrowRight/></button>
      </div>
    </div>
  );
}

/* ============= HERO ============= */
function WaitHero({ onStart }) {
  const [text, setText] = useState("");
  const [pulse, setPulse] = useState(false);
  const chips = ["📅  Booking page for my bakery", "📋  Client intake form", "📦  Inventory tracker", "🎉  Event RSVP site", "💬  Customer support portal"];
  const pick = (s) => {
    setText(s); setPulse(true); setTimeout(() => setPulse(false), 450);
    const card = document.querySelector(".prompt-card");
    if (card) window.scrollTo({ top: window.scrollY + card.getBoundingClientRect().top - 120, behavior: "smooth" });
  };
  return (
    <section className="hero hero-b" data-screen-label="hero">
      <div className="hero-b-inner">
        <span className="hero-b-eyebrow">
          <span className="hero-b-faces">
            <span style={{ background: "linear-gradient(135deg,#FF7A4D,#FFC53D)" }}></span>
            <span style={{ background: "linear-gradient(135deg,#7A3FB0,#A23C9C)" }}></span>
            <span style={{ background: "linear-gradient(135deg,#1FB295,#6FA8E0)" }}></span>
          </span>
          <span>Private beta · <b>invites go out weekly</b></span>
        </span>
        <h1 className="hero-b-h">Build websites &amp; apps <em>with AI.</em></h1>
        <p className="hero-b-sub">Type what you want in a sentence — we build the whole thing and put it online. No code, no designer, no waiting on a developer. Tell us your idea to claim your spot.</p>
        <div className="prompt-glow"><IdeaBox value={text} onChange={setText} pulse={pulse} onSubmit={onStart}/></div>
        <p className="chips-label">— or start with —</p>
        <div className="chips">{chips.map(c => <button key={c} className="chip" onClick={() => pick(c)}>{c}</button>)}</div>
      </div>
    </section>
  );
}

/* ============= FINAL CTA ============= */
function WaitCTA({ onStart }) {
  const [text, setText] = useState("");
  return (
    <section className="final" data-screen-label="final-cta">
      <img src="assets/logo-mark.png" alt="" className="final-watermark" aria-hidden="true"/>
      <div className="wrap-tight">
        <Reveal>
          <div className="eyebrow final-eyebrow">Your turn</div>
          <h2>Got an idea? <em>Let's <span className="marker">build it.</span></em></h2>
          <p>Type it below, make an account, and you're on the list. We'll email you the moment your invite is ready.</p>
          <div className="final-prompt-wrap"><IdeaBox value={text} onChange={setText} onSubmit={onStart} cta="Claim my spot"/></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= PHONE FIELD ============= */
const WL_COUNTRIES = [
  { c: "US", flag: "🇺🇸", name: "United States", dial: "+1", fmt: "(555) 010-2233" },
  { c: "CA", flag: "🇨🇦", name: "Canada", dial: "+1", fmt: "(555) 010-2233" },
  { c: "GB", flag: "🇬🇧", name: "United Kingdom", dial: "+44", fmt: "7400 123456" },
  { c: "AF", flag: "🇦🇫", name: "Afghanistan", dial: "+93", fmt: "70 123 4567" },
  { c: "AL", flag: "🇦🇱", name: "Albania", dial: "+355", fmt: "66 123 4567" },
  { c: "DZ", flag: "🇩🇿", name: "Algeria", dial: "+213", fmt: "551 23 45 67" },
  { c: "AD", flag: "🇦🇩", name: "Andorra", dial: "+376", fmt: "312 345" },
  { c: "AO", flag: "🇦🇴", name: "Angola", dial: "+244", fmt: "923 123 456" },
  { c: "AG", flag: "🇦🇬", name: "Antigua & Barbuda", dial: "+1268", fmt: "464 1234" },
  { c: "AR", flag: "🇦🇷", name: "Argentina", dial: "+54", fmt: "11 1234 5678" },
  { c: "AM", flag: "🇦🇲", name: "Armenia", dial: "+374", fmt: "77 123456" },
  { c: "AU", flag: "🇦🇺", name: "Australia", dial: "+61", fmt: "412 345 678" },
  { c: "AT", flag: "🇦🇹", name: "Austria", dial: "+43", fmt: "664 1234567" },
  { c: "AZ", flag: "🇦🇿", name: "Azerbaijan", dial: "+994", fmt: "50 123 45 67" },
  { c: "BS", flag: "🇧🇸", name: "Bahamas", dial: "+1242", fmt: "359 1234" },
  { c: "BH", flag: "🇧🇭", name: "Bahrain", dial: "+973", fmt: "3600 1234" },
  { c: "BD", flag: "🇧🇩", name: "Bangladesh", dial: "+880", fmt: "1812 345678" },
  { c: "BB", flag: "🇧🇧", name: "Barbados", dial: "+1246", fmt: "250 1234" },
  { c: "BY", flag: "🇧🇾", name: "Belarus", dial: "+375", fmt: "29 491 19 11" },
  { c: "BE", flag: "🇧🇪", name: "Belgium", dial: "+32", fmt: "470 12 34 56" },
  { c: "BZ", flag: "🇧🇿", name: "Belize", dial: "+501", fmt: "622 1234" },
  { c: "BJ", flag: "🇧🇯", name: "Benin", dial: "+229", fmt: "90 12 34 56" },
  { c: "BT", flag: "🇧🇹", name: "Bhutan", dial: "+975", fmt: "17 12 34 56" },
  { c: "BO", flag: "🇧🇴", name: "Bolivia", dial: "+591", fmt: "71234567" },
  { c: "BA", flag: "🇧🇦", name: "Bosnia & Herzegovina", dial: "+387", fmt: "61 123 456" },
  { c: "BW", flag: "🇧🇼", name: "Botswana", dial: "+267", fmt: "71 123 456" },
  { c: "BR", flag: "🇧🇷", name: "Brazil", dial: "+55", fmt: "11 91234 5678" },
  { c: "BN", flag: "🇧🇳", name: "Brunei", dial: "+673", fmt: "712 3456" },
  { c: "BG", flag: "🇧🇬", name: "Bulgaria", dial: "+359", fmt: "48 123 456" },
  { c: "BF", flag: "🇧🇫", name: "Burkina Faso", dial: "+226", fmt: "70 12 34 56" },
  { c: "BI", flag: "🇧🇮", name: "Burundi", dial: "+257", fmt: "79 56 12 34" },
  { c: "KH", flag: "🇰🇭", name: "Cambodia", dial: "+855", fmt: "91 234 567" },
  { c: "CM", flag: "🇨🇲", name: "Cameroon", dial: "+237", fmt: "6 71 23 45 67" },
  { c: "CV", flag: "🇨🇻", name: "Cape Verde", dial: "+238", fmt: "991 12 34" },
  { c: "CF", flag: "🇨🇫", name: "Central African Republic", dial: "+236", fmt: "70 01 23 45" },
  { c: "TD", flag: "🇹🇩", name: "Chad", dial: "+235", fmt: "63 01 23 45" },
  { c: "CL", flag: "🇨🇱", name: "Chile", dial: "+56", fmt: "9 6123 4567" },
  { c: "CN", flag: "🇨🇳", name: "China", dial: "+86", fmt: "131 2345 6789" },
  { c: "CO", flag: "🇨🇴", name: "Colombia", dial: "+57", fmt: "321 1234567" },
  { c: "KM", flag: "🇰🇲", name: "Comoros", dial: "+269", fmt: "321 23 45" },
  { c: "CG", flag: "🇨🇬", name: "Congo", dial: "+242", fmt: "06 123 4567" },
  { c: "CD", flag: "🇨🇩", name: "Congo (DRC)", dial: "+243", fmt: "991 234 567" },
  { c: "CR", flag: "🇨🇷", name: "Costa Rica", dial: "+506", fmt: "8312 3456" },
  { c: "CI", flag: "🇨🇮", name: "Ivory Coast", dial: "+225", fmt: "01 23 45 67 89" },
  { c: "HR", flag: "🇭🇷", name: "Croatia", dial: "+385", fmt: "91 234 5678" },
  { c: "CU", flag: "🇨🇺", name: "Cuba", dial: "+53", fmt: "5 1234567" },
  { c: "CY", flag: "🇨🇾", name: "Cyprus", dial: "+357", fmt: "96 123456" },
  { c: "CZ", flag: "🇨🇿", name: "Czech Republic", dial: "+420", fmt: "601 123 456" },
  { c: "DK", flag: "🇩🇰", name: "Denmark", dial: "+45", fmt: "32 12 34 56" },
  { c: "DJ", flag: "🇩🇯", name: "Djibouti", dial: "+253", fmt: "77 83 10 01" },
  { c: "DM", flag: "🇩🇲", name: "Dominica", dial: "+1767", fmt: "225 1234" },
  { c: "DO", flag: "🇩🇴", name: "Dominican Republic", dial: "+1809", fmt: "234 5678" },
  { c: "EC", flag: "🇪🇨", name: "Ecuador", dial: "+593", fmt: "99 123 4567" },
  { c: "EG", flag: "🇪🇬", name: "Egypt", dial: "+20", fmt: "100 123 4567" },
  { c: "SV", flag: "🇸🇻", name: "El Salvador", dial: "+503", fmt: "7012 3456" },
  { c: "GQ", flag: "🇬🇶", name: "Equatorial Guinea", dial: "+240", fmt: "222 123 456" },
  { c: "ER", flag: "🇪🇷", name: "Eritrea", dial: "+291", fmt: "7 123 456" },
  { c: "EE", flag: "🇪🇪", name: "Estonia", dial: "+372", fmt: "5123 4567" },
  { c: "SZ", flag: "🇸🇿", name: "Eswatini", dial: "+268", fmt: "7612 3456" },
  { c: "ET", flag: "🇪🇹", name: "Ethiopia", dial: "+251", fmt: "91 123 4567" },
  { c: "FJ", flag: "🇫🇯", name: "Fiji", dial: "+679", fmt: "701 2345" },
  { c: "FI", flag: "🇫🇮", name: "Finland", dial: "+358", fmt: "41 2345678" },
  { c: "FR", flag: "🇫🇷", name: "France", dial: "+33", fmt: "6 12 34 56 78" },
  { c: "GA", flag: "🇬🇦", name: "Gabon", dial: "+241", fmt: "06 03 12 34" },
  { c: "GM", flag: "🇬🇲", name: "Gambia", dial: "+220", fmt: "301 2345" },
  { c: "GE", flag: "🇬🇪", name: "Georgia", dial: "+995", fmt: "555 12 34 56" },
  { c: "DE", flag: "🇩🇪", name: "Germany", dial: "+49", fmt: "1512 3456789" },
  { c: "GH", flag: "🇬🇭", name: "Ghana", dial: "+233", fmt: "23 123 4567" },
  { c: "GR", flag: "🇬🇷", name: "Greece", dial: "+30", fmt: "691 234 5678" },
  { c: "GD", flag: "🇬🇩", name: "Grenada", dial: "+1473", fmt: "403 1234" },
  { c: "GT", flag: "🇬🇹", name: "Guatemala", dial: "+502", fmt: "5123 4567" },
  { c: "GN", flag: "🇬🇳", name: "Guinea", dial: "+224", fmt: "601 12 34 56" },
  { c: "GW", flag: "🇬🇼", name: "Guinea-Bissau", dial: "+245", fmt: "955 012 345" },
  { c: "GY", flag: "🇬🇾", name: "Guyana", dial: "+592", fmt: "609 1234" },
  { c: "HT", flag: "🇭🇹", name: "Haiti", dial: "+509", fmt: "34 10 1234" },
  { c: "HN", flag: "🇭🇳", name: "Honduras", dial: "+504", fmt: "9123 4567" },
  { c: "HK", flag: "🇭🇰", name: "Hong Kong", dial: "+852", fmt: "5123 4567" },
  { c: "HU", flag: "🇭🇺", name: "Hungary", dial: "+36", fmt: "20 123 4567" },
  { c: "IS", flag: "🇮🇸", name: "Iceland", dial: "+354", fmt: "611 1234" },
  { c: "IN", flag: "🇮🇳", name: "India", dial: "+91", fmt: "98765 43210" },
  { c: "ID", flag: "🇮🇩", name: "Indonesia", dial: "+62", fmt: "812 3456 7890" },
  { c: "IR", flag: "🇮🇷", name: "Iran", dial: "+98", fmt: "912 345 6789" },
  { c: "IQ", flag: "🇮🇶", name: "Iraq", dial: "+964", fmt: "791 234 5678" },
  { c: "IE", flag: "🇮🇪", name: "Ireland", dial: "+353", fmt: "85 123 4567" },
  { c: "IL", flag: "🇮🇱", name: "Israel", dial: "+972", fmt: "50 123 4567" },
  { c: "IT", flag: "🇮🇹", name: "Italy", dial: "+39", fmt: "312 345 6789" },
  { c: "JM", flag: "🇯🇲", name: "Jamaica", dial: "+1876", fmt: "210 1234" },
  { c: "JP", flag: "🇯🇵", name: "Japan", dial: "+81", fmt: "90 1234 5678" },
  { c: "JO", flag: "🇯🇴", name: "Jordan", dial: "+962", fmt: "7 9012 3456" },
  { c: "KZ", flag: "🇰🇿", name: "Kazakhstan", dial: "+7", fmt: "771 000 9998" },
  { c: "KE", flag: "🇰🇪", name: "Kenya", dial: "+254", fmt: "712 123456" },
  { c: "KI", flag: "🇰🇮", name: "Kiribati", dial: "+686", fmt: "72 012345" },
  { c: "KW", flag: "🇰🇼", name: "Kuwait", dial: "+965", fmt: "500 12345" },
  { c: "KG", flag: "🇰🇬", name: "Kyrgyzstan", dial: "+996", fmt: "700 123 456" },
  { c: "LA", flag: "🇱🇦", name: "Laos", dial: "+856", fmt: "20 23 123 456" },
  { c: "LV", flag: "🇱🇻", name: "Latvia", dial: "+371", fmt: "21 234 567" },
  { c: "LB", flag: "🇱🇧", name: "Lebanon", dial: "+961", fmt: "71 123 456" },
  { c: "LS", flag: "🇱🇸", name: "Lesotho", dial: "+266", fmt: "5012 3456" },
  { c: "LR", flag: "🇱🇷", name: "Liberia", dial: "+231", fmt: "77 012 3456" },
  { c: "LY", flag: "🇱🇾", name: "Libya", dial: "+218", fmt: "91 2345678" },
  { c: "LI", flag: "🇱🇮", name: "Liechtenstein", dial: "+423", fmt: "660 1234" },
  { c: "LT", flag: "🇱🇹", name: "Lithuania", dial: "+370", fmt: "612 34567" },
  { c: "LU", flag: "🇱🇺", name: "Luxembourg", dial: "+352", fmt: "628 123 456" },
  { c: "MO", flag: "🇲🇴", name: "Macau", dial: "+853", fmt: "6612 3456" },
  { c: "MG", flag: "🇲🇬", name: "Madagascar", dial: "+261", fmt: "32 12 345 67" },
  { c: "MW", flag: "🇲🇼", name: "Malawi", dial: "+265", fmt: "991 23 45 67" },
  { c: "MY", flag: "🇲🇾", name: "Malaysia", dial: "+60", fmt: "12 345 6789" },
  { c: "MV", flag: "🇲🇻", name: "Maldives", dial: "+960", fmt: "771 2345" },
  { c: "ML", flag: "🇲🇱", name: "Mali", dial: "+223", fmt: "65 12 34 56" },
  { c: "MT", flag: "🇲🇹", name: "Malta", dial: "+356", fmt: "9696 1234" },
  { c: "MH", flag: "🇲🇭", name: "Marshall Islands", dial: "+692", fmt: "235 1234" },
  { c: "MR", flag: "🇲🇷", name: "Mauritania", dial: "+222", fmt: "22 12 34 56" },
  { c: "MU", flag: "🇲🇺", name: "Mauritius", dial: "+230", fmt: "5251 2345" },
  { c: "MX", flag: "🇲🇽", name: "Mexico", dial: "+52", fmt: "55 1234 5678" },
  { c: "FM", flag: "🇫🇲", name: "Micronesia", dial: "+691", fmt: "350 1234" },
  { c: "MD", flag: "🇲🇩", name: "Moldova", dial: "+373", fmt: "621 12 345" },
  { c: "MC", flag: "🇲🇨", name: "Monaco", dial: "+377", fmt: "6 12 34 56 78" },
  { c: "MN", flag: "🇲🇳", name: "Mongolia", dial: "+976", fmt: "8812 3456" },
  { c: "ME", flag: "🇲🇪", name: "Montenegro", dial: "+382", fmt: "67 622 901" },
  { c: "MA", flag: "🇲🇦", name: "Morocco", dial: "+212", fmt: "650 123456" },
  { c: "MZ", flag: "🇲🇿", name: "Mozambique", dial: "+258", fmt: "82 123 4567" },
  { c: "MM", flag: "🇲🇲", name: "Myanmar", dial: "+95", fmt: "9 212 345 678" },
  { c: "NA", flag: "🇳🇦", name: "Namibia", dial: "+264", fmt: "81 123 4567" },
  { c: "NR", flag: "🇳🇷", name: "Nauru", dial: "+674", fmt: "555 1234" },
  { c: "NP", flag: "🇳🇵", name: "Nepal", dial: "+977", fmt: "984 1234567" },
  { c: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31", fmt: "6 12345678" },
  { c: "NZ", flag: "🇳🇿", name: "New Zealand", dial: "+64", fmt: "21 123 4567" },
  { c: "NI", flag: "🇳🇮", name: "Nicaragua", dial: "+505", fmt: "8123 4567" },
  { c: "NE", flag: "🇳🇪", name: "Niger", dial: "+227", fmt: "93 12 34 56" },
  { c: "NG", flag: "🇳🇬", name: "Nigeria", dial: "+234", fmt: "802 123 4567" },
  { c: "KP", flag: "🇰🇵", name: "North Korea", dial: "+850", fmt: "191 123 4567" },
  { c: "MK", flag: "🇲🇰", name: "North Macedonia", dial: "+389", fmt: "72 345 678" },
  { c: "NO", flag: "🇳🇴", name: "Norway", dial: "+47", fmt: "406 12 345" },
  { c: "OM", flag: "🇴🇲", name: "Oman", dial: "+968", fmt: "9212 3456" },
  { c: "PK", flag: "🇵🇰", name: "Pakistan", dial: "+92", fmt: "301 2345678" },
  { c: "PW", flag: "🇵🇼", name: "Palau", dial: "+680", fmt: "620 1234" },
  { c: "PS", flag: "🇵🇸", name: "Palestine", dial: "+970", fmt: "59 912 3456" },
  { c: "PA", flag: "🇵🇦", name: "Panama", dial: "+507", fmt: "6123 4567" },
  { c: "PG", flag: "🇵🇬", name: "Papua New Guinea", dial: "+675", fmt: "7012 3456" },
  { c: "PY", flag: "🇵🇾", name: "Paraguay", dial: "+595", fmt: "961 456789" },
  { c: "PE", flag: "🇵🇪", name: "Peru", dial: "+51", fmt: "912 345 678" },
  { c: "PH", flag: "🇵🇭", name: "Philippines", dial: "+63", fmt: "905 123 4567" },
  { c: "PL", flag: "🇵🇱", name: "Poland", dial: "+48", fmt: "512 345 678" },
  { c: "PT", flag: "🇵🇹", name: "Portugal", dial: "+351", fmt: "912 345 678" },
  { c: "QA", flag: "🇶🇦", name: "Qatar", dial: "+974", fmt: "3312 3456" },
  { c: "RO", flag: "🇷🇴", name: "Romania", dial: "+40", fmt: "712 034 567" },
  { c: "RU", flag: "🇷🇺", name: "Russia", dial: "+7", fmt: "912 345 67 89" },
  { c: "RW", flag: "🇷🇼", name: "Rwanda", dial: "+250", fmt: "72 123 4567" },
  { c: "KN", flag: "🇰🇳", name: "Saint Kitts & Nevis", dial: "+1869", fmt: "765 1234" },
  { c: "LC", flag: "🇱🇨", name: "Saint Lucia", dial: "+1758", fmt: "284 5678" },
  { c: "VC", flag: "🇻🇨", name: "Saint Vincent", dial: "+1784", fmt: "430 1234" },
  { c: "WS", flag: "🇼🇸", name: "Samoa", dial: "+685", fmt: "72 12345" },
  { c: "SM", flag: "🇸🇲", name: "San Marino", dial: "+378", fmt: "66 66 12 12" },
  { c: "ST", flag: "🇸🇹", name: "Sao Tome & Principe", dial: "+239", fmt: "981 2345" },
  { c: "SA", flag: "🇸🇦", name: "Saudi Arabia", dial: "+966", fmt: "51 234 5678" },
  { c: "SN", flag: "🇸🇳", name: "Senegal", dial: "+221", fmt: "70 123 45 67" },
  { c: "RS", flag: "🇷🇸", name: "Serbia", dial: "+381", fmt: "60 1234567" },
  { c: "SC", flag: "🇸🇨", name: "Seychelles", dial: "+248", fmt: "2 510 123" },
  { c: "SL", flag: "🇸🇱", name: "Sierra Leone", dial: "+232", fmt: "25 123456" },
  { c: "SG", flag: "🇸🇬", name: "Singapore", dial: "+65", fmt: "8123 4567" },
  { c: "SK", flag: "🇸🇰", name: "Slovakia", dial: "+421", fmt: "912 123 456" },
  { c: "SI", flag: "🇸🇮", name: "Slovenia", dial: "+386", fmt: "31 234 567" },
  { c: "SB", flag: "🇸🇧", name: "Solomon Islands", dial: "+677", fmt: "74 12345" },
  { c: "SO", flag: "🇸🇴", name: "Somalia", dial: "+252", fmt: "90 1234567" },
  { c: "ZA", flag: "🇿🇦", name: "South Africa", dial: "+27", fmt: "82 123 4567" },
  { c: "KR", flag: "🇰🇷", name: "South Korea", dial: "+82", fmt: "10 1234 5678" },
  { c: "SS", flag: "🇸🇸", name: "South Sudan", dial: "+211", fmt: "977 123 456" },
  { c: "ES", flag: "🇪🇸", name: "Spain", dial: "+34", fmt: "612 34 56 78" },
  { c: "LK", flag: "🇱🇰", name: "Sri Lanka", dial: "+94", fmt: "71 234 5678" },
  { c: "SD", flag: "🇸🇩", name: "Sudan", dial: "+249", fmt: "91 123 1234" },
  { c: "SR", flag: "🇸🇷", name: "Suriname", dial: "+597", fmt: "741 2345" },
  { c: "SE", flag: "🇸🇪", name: "Sweden", dial: "+46", fmt: "70 123 45 67" },
  { c: "CH", flag: "🇨🇭", name: "Switzerland", dial: "+41", fmt: "78 123 45 67" },
  { c: "SY", flag: "🇸🇾", name: "Syria", dial: "+963", fmt: "944 567 890" },
  { c: "TW", flag: "🇹🇼", name: "Taiwan", dial: "+886", fmt: "912 345 678" },
  { c: "TJ", flag: "🇹🇯", name: "Tajikistan", dial: "+992", fmt: "917 12 3456" },
  { c: "TZ", flag: "🇹🇿", name: "Tanzania", dial: "+255", fmt: "621 234 567" },
  { c: "TH", flag: "🇹🇭", name: "Thailand", dial: "+66", fmt: "81 234 5678" },
  { c: "TL", flag: "🇹🇱", name: "Timor-Leste", dial: "+670", fmt: "7712 3456" },
  { c: "TG", flag: "🇹🇬", name: "Togo", dial: "+228", fmt: "90 12 34 56" },
  { c: "TO", flag: "🇹🇴", name: "Tonga", dial: "+676", fmt: "771 5123" },
  { c: "TT", flag: "🇹🇹", name: "Trinidad & Tobago", dial: "+1868", fmt: "291 1234" },
  { c: "TN", flag: "🇹🇳", name: "Tunisia", dial: "+216", fmt: "20 123 456" },
  { c: "TR", flag: "🇹🇷", name: "Turkey", dial: "+90", fmt: "501 234 56 78" },
  { c: "TM", flag: "🇹🇲", name: "Turkmenistan", dial: "+993", fmt: "66 012345" },
  { c: "TV", flag: "🇹🇻", name: "Tuvalu", dial: "+688", fmt: "90 1234" },
  { c: "UG", flag: "🇺🇬", name: "Uganda", dial: "+256", fmt: "712 345678" },
  { c: "UA", flag: "🇺🇦", name: "Ukraine", dial: "+380", fmt: "50 123 4567" },
  { c: "AE", flag: "🇦🇪", name: "UAE", dial: "+971", fmt: "50 123 4567" },
  { c: "UY", flag: "🇺🇾", name: "Uruguay", dial: "+598", fmt: "94 231 234" },
  { c: "UZ", flag: "🇺🇿", name: "Uzbekistan", dial: "+998", fmt: "91 234 56 78" },
  { c: "VU", flag: "🇻🇺", name: "Vanuatu", dial: "+678", fmt: "591 2345" },
  { c: "VE", flag: "🇻🇪", name: "Venezuela", dial: "+58", fmt: "412 1234567" },
  { c: "VN", flag: "🇻🇳", name: "Vietnam", dial: "+84", fmt: "91 234 56 78" },
  { c: "YE", flag: "🇾🇪", name: "Yemen", dial: "+967", fmt: "712 345 678" },
  { c: "ZM", flag: "🇿🇲", name: "Zambia", dial: "+260", fmt: "95 5123456" },
  { c: "ZW", flag: "🇿🇼", name: "Zimbabwe", dial: "+263", fmt: "71 234 5678" },
];

function formatNational(country, digits) {
  const mask = country.fmt;
  const cap = (mask.match(/\d/g) || []).length;
  const d = digits.slice(0, cap);
  let out = "", i = 0;
  for (const ch of mask) {
    if (i >= d.length) break;
    if (/\d/.test(ch)) { out += d[i++]; } else { out += ch; }
  }
  return out;
}

function PhoneField({ country, setCountry, value, onChange, onEnter }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const filtered = search.trim()
    ? WL_COUNTRIES.filter((k) => {
        const q = search.trim().toLowerCase();
        return k.name.toLowerCase().includes(q) || k.dial.includes(q) || k.c.toLowerCase() === q;
      })
    : WL_COUNTRIES;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) { setSearch(""); setTimeout(() => searchRef.current && searchRef.current.focus(), 60); }
  };

  return (
    <div className="wl-phone">
      <div className={"wl-phone-pick" + (open ? " on" : "")}>
        <button type="button" className="wl-phone-btn" onClick={toggle} aria-haspopup="listbox" aria-expanded={open}>
          <span className="wl-phone-flag">{country.flag}</span>
          <span className="wl-phone-dial">{country.dial}</span>
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {open && (
          <React.Fragment>
            <div className="wl-phone-back" onClick={() => setOpen(false)}></div>
            <div className="wl-phone-menu" role="listbox">
              <div className="wl-phone-search-wrap">
                <input ref={searchRef} className="wl-phone-search" type="text" placeholder="Search country…"
                  value={search} onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <ul className="wl-phone-list">
                {filtered.length === 0 && <li className="wl-phone-empty">No results</li>}
                {filtered.map((k) => (
                  <li key={k.c + k.dial}>
                    <button type="button" className={"wl-phone-item" + (k.c === country.c ? " active" : "")}
                      onClick={() => { setCountry(k); setOpen(false); setSearch(""); onChange(""); }}>
                      <span className="wl-phone-flag">{k.flag}</span>
                      <span className="wl-phone-name">{k.name}</span>
                      <span className="wl-phone-dial">{k.dial}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
      <input type="tel" inputMode="tel" value={value} placeholder={country.fmt}
        onChange={(e) => onChange(formatNational(country, e.target.value.replace(/\D/g, "")))}
        onKeyDown={(e) => { if (e.key === "Enter") onEnter(); }}/>
    </div>
  );
}

/* ============= SIGNUP FLOW ============= */
function SignupFlow({ idea, onClose }) {
  const [step, setStep] = useState("account");
  const [f, setF] = useState({ username: "", email: "", password: "", phone: "" });
  const [country, setCountry] = useState(WL_COUNTRIES[0]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [place, setPlace] = useState(0);
  const set = (k) => (e) => { setF(v => ({ ...v, [k]: e.target.value })); setErr(""); };

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && step === "account") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [step]);

  const COUNTER_URL = "https://jsonblob.com/api/jsonBlob/019fd31d-13e2-72d1-9a8d-2a6edae94a36";

  const create = async () => {
    if (f.username.trim().length < 3) return setErr("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("That email doesn't look right.");
    setBusy(true);

    /* Fetch shared counter, increment, and write back */
    let n = 2618;
    try {
      const res = await fetch(COUNTER_URL, { headers: { Accept: "application/json" } });
      const data = await res.json();
      n = (typeof data.position === "number" && data.position >= 2618) ? data.position + 1 : 2618;
      await fetch(COUNTER_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position: n }),
      });
    } catch (e) {
      /* Fallback to localStorage if the service is unreachable */
      try {
        const stored = parseInt(localStorage.getItem("abwai_wl_place") || "", 10);
        n = Number.isFinite(stored) ? stored + 1 : 2618;
      } catch (e2) {}
    }
    try { localStorage.setItem("abwai_wl_place", String(n)); } catch (e) {}
    setPlace(n);

    /* ---- Customer.io Forms API ---- */
    const em = f.email.trim().toLowerCase();
    const phone = f.phone ? (country.dial + " " + f.phone) : "";
    try {
      fetch("https://track.customer.io/api/v1/forms/waitlist-form/submit", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa("7b67f7dcbf9b37924c40:8433292116b3e186eee2"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            email: em,
            name: f.username.trim(),
            phone: phone,
            waitlist_position: String(n),
            source: "waitlist_investfest",
          },
        }),
      });
    } catch (err) {}
    setTimeout(() => { setBusy(false); setStep("done"); if (typeof fbq === "function") fbq("track", "Subscribe"); }, 1100);
  };

  return (
    <div className="wl-flow" role="dialog" aria-modal="true">
      <div className="wl-flow-bar">
        <Logo/>
        {step === "account" && <button className="wl-flow-close" onClick={onClose}>Back to site ✕</button>}
      </div>

      {step === "account" ? (
        <div className="wl-flow-body">
          <div className="wl-panel">
            <div className="wl-step">STEP 2 OF 2</div>
            <h2 className="wl-h">Create your account.</h2>
            <p className="wl-sub">One account holds your idea, your builds, and your place in line.</p>
            <div className="wl-field">
              <label>Your name</label>
              <input value={f.username} onChange={set("username")} placeholder="e.g. Maya Chen" autoFocus/>
            </div>
            <div className="wl-field">
              <label>Email</label>
              <input type="email" value={f.email} onChange={set("email")} placeholder="you@example.com"/>
            </div>
            <div className="wl-field">
              <label>Phone <span className="wl-opt">optional</span></label>
              <PhoneField country={country} setCountry={setCountry} value={f.phone}
                onChange={(v) => { setF(s => ({ ...s, phone: v })); setErr(""); }} onEnter={create}/>
              <span className="wl-hint">We'll text your invite the day it's ready — nothing else.</span>
            </div>
            {err && <div className="wl-err">{err}</div>}
            <button className="btn btn-coral wl-submit" onClick={create} disabled={busy}>
              {busy ? "Creating your account…" : <>Create account <ArrowRight/></>}
            </button>
            <p className="wl-fine">No card. No spam. Leave the list any time.</p>
          </div>

          <aside className="wl-aside">
            <div className="wl-aside-tag">{idea ? "YOUR IDEA" : "WHAT YOU GET"}</div>
            {idea && <blockquote className="wl-aside-idea">{idea}</blockquote>}
            <ul className="wl-aside-list">
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>Saved to your account</b><small>Waiting for you the moment you're in.</small></li>
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>First thing we build</b><small>Your invite day starts with this idea.</small></li>
              <li><span className="wl-aside-check" aria-hidden="true">✓</span><b>100 free credits</b><small>Enough to build and publish it.</small></li>
            </ul>
            <div className="wl-aside-foot">
              <span className="wl-aside-foot-dot" aria-hidden="true"></span>
              Invites go out weekly, in order
            </div>
          </aside>
        </div>
      ) : (
        <div className="wl-flow-body wl-done-body">
          <div className="wl-done">
            <div className="wl-done-burst" aria-hidden="true">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>

            <div className="wl-card">
              <div className="wl-card-glow" aria-hidden="true"></div>
              <div className="wl-card-mark">✓</div>
              <div className="wl-card-eyebrow">You're on the list</div>
              <h2 className="wl-card-h">You're now on the<br/><em>waitlist.</em></h2>
              <p className="wl-card-sub">We'll let you know when we launch. Your invite goes to <b>{f.email}</b>{f.phone ? <>, and we'll text <b>{country.dial} {f.phone}</b> the same morning</> : null}.</p>

              <div className="wl-card-place">
                <span className="wl-card-place-lbl">Your place in line</span>
                <span className="wl-card-place-num">#{place.toLocaleString()}</span>
                <span className="wl-card-place-note">Invites go out every week, in order</span>
              </div>
            </div>

            <div className={"wl-two" + (idea ? "" : " wl-two-solo")}>
              {idea && <div className="wl-idea-card">
                <div className="wl-idea-tag">First thing we'll build for you</div>
                <p className="wl-idea-quote">“{idea}”</p>
                <div className="wl-idea-foot"><span>✦</span> Saved to your account · 100 credits waiting</div>
              </div>}
              <ol className="wl-steps">
                <li><b>Your invite lands</b>Weekly, in order — no queue-jumping.</li>
                <li><b>You describe it</b>One sentence is enough to start.</li>
                <li><b>It goes live</b>First app online in about three minutes.</li>
              </ol>
            </div>

            <div className="wl-share">
              <div className="wl-share-row">
                <button className="wl-share-btn ghost" onClick={onClose}>Back to the site</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.PoofWait = { WaitHero, WaitCTA, SignupFlow, IdeaBox };
