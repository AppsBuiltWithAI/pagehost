/* global React */

const { TweaksPanel, useTweaks, TweakSection, TweakSelect, TweakSlider, TweakColor, TweakToggle } = window;

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "headlineFont": "Roboto",
  "bodyFont": "Roboto",
  "headlineWeight": 700,
  "headlineItalic": false,
  "tightness": 1.0,
  "headlineColor": "#181818",
  "accentColor": "#FF5C4D"
}/*EDITMODE-END*/;

const HEADLINE_FONTS = {
  "Instrument Serif": '"Instrument Serif", "Times New Roman", serif',
  "Roboto":           '"Roboto", -apple-system, sans-serif',
  "Roboto Serif":     '"Roboto Serif", "Times New Roman", serif',
  "Playfair":         '"Playfair Display", "Times New Roman", serif',
  "DM Serif":         '"DM Serif Display", "Times New Roman", serif',
  "Fraunces":         '"Fraunces", "Times New Roman", serif',
};
const BODY_FONTS = {
  "Roboto":     '"Roboto", -apple-system, sans-serif',
  "Inter":      '"Inter", -apple-system, sans-serif',
  "DM Sans":    '"DM Sans", -apple-system, sans-serif',
  "IBM Plex":   '"IBM Plex Sans", -apple-system, sans-serif',
};

function PoofTweaks() {
  const [t, setT] = useTweaks(TWEAK_DEFAULS);

  // Apply tweaks to CSS variables on :root
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--f-head", HEADLINE_FONTS[t.headlineFont] || HEADLINE_FONTS["Instrument Serif"]);
    r.setProperty("--f-sans", BODY_FONTS[t.bodyFont] || BODY_FONTS["Roboto"]);
    r.setProperty("--h-weight", String(t.headlineWeight));
    r.setProperty("--h-italic", t.headlineItalic ? "italic" : "normal");
    r.setProperty("--pad-scale", String(t.tightness));
    r.setProperty("--ink", t.headlineColor);
    r.setProperty("--coral", t.accentColor);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Headline">
        <TweakSelect
          label="Font"
          value={t.headlineFont}
          options={Object.keys(HEADLINE_FONTS)}
          onChange={(v) => setT("headlineFont", v)}
        />
        <TweakSlider
          label="Weight"
          min={300} max={700} step={100}
          value={t.headlineWeight}
          onChange={(v) => setT("headlineWeight", v)}
        />
        <TweakToggle
          label="Italic"
          value={t.headlineItalic}
          onChange={(v) => setT("headlineItalic", v)}
        />
        <TweakColor
          label="Color"
          value={t.headlineColor}
          options={["#181818", "#1F1A2E", "#3D2A1F", "#1F3D2A", "#2A1F3D"]}
          onChange={(v) => setT("headlineColor", v)}
        />
      </TweakSection>

      <TweakSection label="Body">
        <TweakSelect
          label="Font"
          value={t.bodyFont}
          options={Object.keys(BODY_FONTS)}
          onChange={(v) => setT("bodyFont", v)}
        />
      </TweakSection>

      <TweakSection label="Layout">
        <TweakSlider
          label="Spacing"
          min={0.7} max={1.4} step={0.05}
          value={t.tightness}
          onChange={(v) => setT("tightness", v)}
        />
        <TweakColor
          label="Accent"
          value={t.accentColor}
          options={["#FF5C4D", "#1FB295", "#6FA8E0", "#F08DB8", "#FFC53D"]}
          onChange={(v) => setT("accentColor", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

window.PoofTweaks = PoofTweaks;
