/* global React, PoofD */
const { useState, useEffect, Ic } = PoofD;

/* ============= INCOMING SHARE INVITES ============= */
/* Workflow when someone shares a project with you:
   1. Invite appears as a card in the "Pending invites" strip at top of Home.
   2. You click Review → modal opens with project preview, sender note, role,
      permissions checklist, recent activity.
   3. Accept → app moves into "Shared with me". Decline → invite dismissed.
*/

const PENDING_INVITES = [
  {
    id: "inv-1",
    project: {
      name: "Crumb & Co. — Holiday Menu",
      emoji: "🥐",
      thumb: "thumb-shared-menu",
      url: "crumb-holidays.appsbuilt.ai",
      pages: 4,
      collaborators: 3,
      lastEdit: "12 minutes ago",
      created: "Nov 14, 2026",
    },
    from: {
      name: "Marcus Webb",
      email: "marcus@crumbandco.com",
      initials: "MW",
      tint: "plum",
      title: "Owner · Crumb & Co.",
    },
    role: "editor",
    note: "Need your eye on the seasonal landing — copy is still rough and the photo grid feels off. Take a pass before Friday's launch?",
    sentAt: "Sent 2 hours ago",
    expiresIn: "Expires in 7 days",
  },
  {
    id: "inv-2",
    project: {
      name: "Open Studio Spring '26",
      emoji: "🪴",
      thumb: "thumb-shared-rsvp",
      url: "—",
      pages: 2,
      collaborators: 2,
      lastEdit: "yesterday",
      created: "May 12, 2026",
    },
    from: {
      name: "Sarah Lin",
      email: "sarah@studio.co",
      initials: "SL",
      tint: "rose",
      title: "Producer",
    },
    role: "viewer",
    note: "Adding you as a viewer so you can sanity-check the RSVP flow on mobile. No edits needed.",
    sentAt: "Sent yesterday",
    expiresIn: "Expires in 6 days",
  },
];

const ROLE_PERMISSIONS = {
  editor: {
    label: "Editor",
    blurb: "Can change content, layout, publish, and invite others.",
    can:    ["Edit pages, content, and design", "Publish & roll back versions", "Invite collaborators", "Access analytics"],
    cannot: ["Delete the project", "Transfer ownership", "Change billing"],
  },
  viewer: {
    label: "Viewer",
    blurb: "Read-only access. Can leave comments but can't edit.",
    can:    ["View all pages and the live URL", "Leave comments on any element", "See activity feed"],
    cannot: ["Edit any content", "Publish or roll back", "Invite others", "Access analytics"],
  },
  admin: {
    label: "Admin",
    blurb: "Full control — same as the owner except for billing.",
    can:    ["Everything an editor can do", "Transfer ownership", "Delete the project", "Manage team & roles"],
    cannot: ["Change billing settings"],
  },
};

/* ============= INVITES STRIP (Home page header) ============= */
function InvitesStrip({ invites, dismissed, onReview, onDecline }) {
  const visible = invites.filter(i => !dismissed.includes(i.id));
  if (visible.length === 0) return null;

  return (
    <div className="invites-strip" data-screen-label="invites-strip">
      <div className="invites-strip-head">
        <div className="invites-strip-eyebrow">
          <span className="invites-strip-pulse"/>
          <span>{visible.length} pending invitation{visible.length === 1 ? "" : "s"}</span>
        </div>
        <div className="invites-strip-title">
          <strong>People are sharing projects with you.</strong>
          <span>Review each before it shows up in your workspace.</span>
        </div>
      </div>
      <div className="invites-strip-cards">
        {visible.map((inv) => (
          <div key={inv.id} className="invite-card">
            <div className={"invite-card-thumb " + inv.project.thumb}>
              <span className="invite-card-emoji">{inv.project.emoji}</span>
              <span className={"invite-card-role-pill role-" + inv.role}>{ROLE_PERMISSIONS[inv.role].label}</span>
            </div>
            <div className="invite-card-body">
              <div className="invite-card-from">
                <span className={"invite-av tint-" + inv.from.tint}>{inv.from.initials}</span>
                <div className="invite-card-from-meta">
                  <div className="invite-card-from-name"><strong>{inv.from.name}</strong> invited you</div>
                  <div className="invite-card-from-time">{inv.sentAt}</div>
                </div>
              </div>
              <div className="invite-card-project">{inv.project.name}</div>
              <p className="invite-card-note">"{inv.note}"</p>
              <div className="invite-card-actions">
                <button className="btn btn-coral btn-sm" onClick={() => onReview(inv)}>
                  Review invitation <Ic.ArrowR size={12}/>
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => onDecline(inv.id)}>Decline</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============= REVIEW MODAL ============= */
function InviteReviewModal({ invite, onAccept, onDecline, onClose }) {
  const [stage, setStage] = useState("review"); // review | accepting | accepted
  const [notifyOnEdits, setNotifyOnEdits] = useState(true);
  const [notifyOnComments, setNotifyOnComments] = useState(true);
  const role = ROLE_PERMISSIONS[invite.role];

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const accept = () => {
    setStage("accepting");
    setTimeout(() => {
      setStage("accepted");
      setTimeout(() => onAccept(invite), 1200);
    }, 900);
  };

  return (
    <div className="invite-overlay" onClick={onClose}>
      <div className="invite-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="invite-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {/* HEADER — project preview */}
        <div className={"invite-modal-hero " + invite.project.thumb}>
          <div className="invite-modal-hero-tint"/>
          <div className="invite-modal-hero-inner">
            <span className="invite-modal-emoji">{invite.project.emoji}</span>
            <div className="invite-modal-hero-meta">
              <div className="invite-modal-eyebrow">You're being invited to</div>
              <h2 className="invite-modal-name">{invite.project.name}</h2>
              <div className="invite-modal-url">
                {invite.project.url === "—" ? (
                  <span style={{ opacity: .7 }}>Not published yet</span>
                ) : (
                  <><Ic.Globe/> {invite.project.url}</>
                )}
              </div>
            </div>
            <span className={"invite-modal-role role-" + invite.role}>
              {role.label}
            </span>
          </div>
        </div>

        {stage === "review" && (
          <div className="invite-modal-body">
            {/* Sender + note */}
            <div className="invite-from-block">
              <span className={"invite-av lg tint-" + invite.from.tint}>{invite.from.initials}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="invite-from-line"><strong>{invite.from.name}</strong> · {invite.from.title}</div>
                <div className="invite-from-email">{invite.from.email}</div>
              </div>
              <div className="invite-from-time">
                <div>{invite.sentAt}</div>
                <div className="invite-expires">{invite.expiresIn}</div>
              </div>
            </div>

            {invite.note && (
              <div className="invite-note">
                <svg className="invite-note-quote" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 6C5 6 3 8 3 10.5V18h6v-7H6c0-1.7 1.3-3 3-3V6H7.5Zm10 0C15 6 13 8 13 10.5V18h6v-7h-3c0-1.7 1.3-3 3-3V6h-1.5Z"/></svg>
                <p>{invite.note}</p>
              </div>
            )}

            {/* Permissions */}
            <div className="invite-section">
              <div className="invite-section-head">
                <div className="invite-section-title">What you'll be able to do</div>
                <div className="invite-section-sub">{role.blurb}</div>
              </div>
              <div className="invite-perms">
                <div className="invite-perm-col">
                  {role.can.map((c) => (
                    <div key={c} className="invite-perm">
                      <span className="invite-perm-tick can">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
                      </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
                <div className="invite-perm-col">
                  {role.cannot.map((c) => (
                    <div key={c} className="invite-perm muted">
                      <span className="invite-perm-tick cannot">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
                      </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project facts */}
            <div className="invite-facts">
              <div className="invite-fact">
                <div className="invite-fact-label">Pages</div>
                <div className="invite-fact-value">{invite.project.pages}</div>
              </div>
              <div className="invite-fact">
                <div className="invite-fact-label">Collaborators</div>
                <div className="invite-fact-value">{invite.project.collaborators}</div>
              </div>
              <div className="invite-fact">
                <div className="invite-fact-label">Last edit</div>
                <div className="invite-fact-value">{invite.project.lastEdit}</div>
              </div>
              <div className="invite-fact">
                <div className="invite-fact-label">Created</div>
                <div className="invite-fact-value">{invite.project.created}</div>
              </div>
            </div>

            {/* Notification prefs */}
            <div className="invite-section">
              <div className="invite-section-head">
                <div className="invite-section-title">Notify me about</div>
                <div className="invite-section-sub">You can change this anytime in Settings → Notifications.</div>
              </div>
              <div className="invite-notify">
                <label className="invite-notify-row">
                  <input type="checkbox" checked={notifyOnEdits} onChange={(e) => setNotifyOnEdits(e.target.checked)}/>
                  <div>
                    <div className="invite-notify-label">Edits and publishes</div>
                    <div className="invite-notify-sub">A daily summary, not every keystroke.</div>
                  </div>
                </label>
                <label className="invite-notify-row">
                  <input type="checkbox" checked={notifyOnComments} onChange={(e) => setNotifyOnComments(e.target.checked)}/>
                  <div>
                    <div className="invite-notify-label">@mentions and comments</div>
                    <div className="invite-notify-sub">Real-time — only when someone tags you.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="invite-modal-foot">
              <button className="btn btn-ghost" onClick={() => { onDecline(invite.id); onClose(); }}>Decline invitation</button>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-outline" onClick={onClose}>Maybe later</button>
                <button className="btn btn-coral" onClick={accept}>
                  Accept &amp; open project <Ic.ArrowR size={12}/>
                </button>
              </div>
            </div>
            <div className="invite-modal-fine">
              <Ic.Lock/> {invite.from.name} will see that you've accepted. Your email and profile are visible to other collaborators on this project.
            </div>
          </div>
        )}

        {stage === "accepting" && (
          <div className="invite-stage-center">
            <div className="invite-spinner">
              <span/><span/><span/>
            </div>
            <div className="invite-stage-title">Adding you to the project…</div>
            <div className="invite-stage-sub">Setting permissions · syncing latest version · setting up notifications</div>
          </div>
        )}

        {stage === "accepted" && (
          <div className="invite-stage-center">
            <div className="invite-success">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
            </div>
            <div className="invite-stage-title">You're in.</div>
            <div className="invite-stage-sub">Opening <strong>{invite.project.name}</strong>…</div>
          </div>
        )}
      </div>
    </div>
  );
}

window.PoofD_Invites = { PENDING_INVITES, InvitesStrip, InviteReviewModal };
