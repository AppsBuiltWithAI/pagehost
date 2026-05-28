/* global React */
const { useState, useEffect, useRef, useMemo } = React;

/* ============= SHARED ICONS ============= */
const Ic = {
  Home:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  Spark:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>,
  Templates: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Chart:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>,
  Users:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Settings:() => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  Activity:() => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Search:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Bell:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
  Help:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5"/></svg>,
  Plus:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  ArrowR:  ({size=14}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  Up:      () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>,
  Down:    () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7 7 17M17 17H7V7"/></svg>,
  Eye:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12"/><circle cx="12" cy="12" r="3"/></svg>,
  Clock:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Dots:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  Lock:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Send:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>,
  Image:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  Code:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>,
  Globe:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>,
  Desktop: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>,
  Tablet:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r=".5"/></svg>,
  Phone:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="18" r=".5"/></svg>,
  Mic:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>,
  Camera:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Undo:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/></svg>,
  ThumbUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L15 2a3 3 0 0 1 1 5.88z"/></svg>,
  ThumbDn: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L9 22a3 3 0 0 1-1-5.88z"/></svg>,
  Copy:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  More:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  ChevDn:  () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Branch:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Inspect: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1M9 21h1M14 3h1M14 21h1M3 9v1M21 9v1M3 14v1M21 14v1"/></svg>,
  Comment: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>,
  GitHub:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  Sliders: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  PanelL:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  Layers:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>,
  Trend:   () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Zap:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Refresh: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  ExtLink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Share:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  FileEdit:() => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m18 2 4 4-9 9h-4v-4l9-9Z"/></svg>,
  Plug:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0V8ZM12 17v5"/></svg>,
  Cloud:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a5 5 0 0 0 1-9.9 7 7 0 0 0-13.7 1.6A4.5 4.5 0 0 0 6 19h11.5Z"/></svg>,
  Brain:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0-3 3v2a3 3 0 0 0 0 6v2a3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V5Z"/><path d="M12 5a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1 3 3v2a3 3 0 0 1 0 6v2a3 3 0 0 1-3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3V5Z"/></svg>,
  Database:() => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6a9 3 0 0 0 18 0V5"/><path d="M3 11v6a9 3 0 0 0 18 0v-6"/></svg>,
};

/* ============= SAMPLE DATA ============= */
const APPS = [
  { id: "crumb",   name: "Crumb & Co.",     emoji: "🥐", url: "crumb.appsbuilt.ai",    status: "live",     thumb: "thumb-bakery",  visitors: 1284, edited: "2 hours ago",  editedAt: "May 25, 2026", createdAt: "Apr 12, 2026", cat: "Business" },
  { id: "yoga",    name: "Stillpoint",      emoji: "🧘", url: "stillpoint.appsbuilt.ai", status: "live",   thumb: "thumb-yoga",    visitors: 642,  edited: "yesterday",    editedAt: "May 24, 2026", createdAt: "Mar 2, 2026",  cat: "Business" },
  { id: "invoice", name: "Invoice Stack",   emoji: "🧾", url: "invoices.appsbuilt.ai",   status: "live",   thumb: "thumb-invoice", visitors: 89,   edited: "3 days ago",   editedAt: "May 22, 2026", createdAt: "Feb 18, 2026", cat: "Forms" },
  { id: "book",    name: "Page Turners",    emoji: "📚", url: "—",                  status: "draft",   thumb: "thumb-book",    visitors: 0,    edited: "Tuesday",      editedAt: "May 19, 2026", createdAt: "May 19, 2026", cat: "Personal" },
  { id: "shop",    name: "Garage Sale",     emoji: "🛒", url: "garagesale.appsbuilt.ai", status: "live",   thumb: "thumb-shop",    visitors: 312,  edited: "5 days ago",   editedAt: "May 20, 2026", createdAt: "Jan 7, 2026",  cat: "Stores" },
  { id: "event",   name: "Hello, Party",    emoji: "🎉", url: "—",                  status: "draft",   thumb: "thumb-event",   visitors: 0,    edited: "1 week ago",   editedAt: "May 18, 2026", createdAt: "May 18, 2026", cat: "Personal" },
  { id: "rsvp",    name: "Studio Open Day", emoji: "🪴", url: "openday.appsbuilt.ai", status: "live", thumb: "thumb-shared-rsvp", visitors: 218, edited: "yesterday", editedAt: "May 24, 2026", createdAt: "Apr 30, 2026", cat: "Shared", sharedBy: { name: "Devon Park", initials: "DP", role: "editor", color: "warm" } },
  { id: "studio",  name: "Devon's Portfolio", emoji: "🎨", url: "devonpark.studio", status: "live",  thumb: "thumb-shared-portfolio", visitors: 1820, edited: "3 days ago", editedAt: "May 22, 2026", createdAt: "Mar 11, 2026", cat: "Shared", sharedBy: { name: "Devon Park", initials: "DP", role: "viewer", color: "warm" } },
  { id: "menu",    name: "HelloBakery Menu", emoji: "🥖", url: "—",                 status: "draft",   thumb: "thumb-shared-menu", visitors: 0,   edited: "this morning", editedAt: "May 25, 2026", createdAt: "May 20, 2026", cat: "Shared", sharedBy: { name: "Marcus Webb", initials: "MW", role: "editor", color: "plum" } },
];

const ACTIVITY = [
  { kind: "publish", text: "You published <strong>Crumb & Co.</strong> to crumb.appsbuilt.ai", time: "2h ago" },
  { kind: "edit",    text: "Edited <strong>Stillpoint</strong> — \"Add weekly schedule view\"", time: "yesterday" },
  { kind: "invite",  text: "<strong>Sarah Lin</strong> joined your workspace as editor", time: "yesterday" },
  { kind: "create",  text: "You poofed <strong>Page Turners</strong> from a template", time: "Tuesday" },
  { kind: "publish", text: "You published <strong>Garage Sale</strong>", time: "5d ago" },
  { kind: "edit",    text: "Edited <strong>Invoice Stack</strong> — \"Fix totals on PDF\"", time: "1w ago" },
];

/* ============= REUSABLE: SIDEBAR ============= */
const TESTING_TABS = [
  { id: "tests",     label: "Tests",     ic: "Inspect" },
  { id: "scenarios", label: "Scenarios", ic: "Branch"  },
  { id: "uptime",    label: "Uptime",    ic: "Activity"},
  { id: "schedule",  label: "Schedule",  ic: "Clock"   },
  { id: "alerts",    label: "Alerts",    ic: "Bell"    },
  { id: "live",      label: "Live",      ic: "Zap", live: true },
];

function Sidebar({ page, sub, setPage, onShare }) {
  const compact = page === "editor";

  const sections = [
    {
      title: "Create",
      items: [
        { id: "home",      label: "Home",     icon: "Home",      badge: APPS.length },
        { id: "plan",      label: "Plan",     icon: "Sliders" },
        { id: "editor",    label: "Editor",   icon: "Spark" },
        { id: "templates", label: "Templates",icon: "Templates" },
      ],
    },
    {
      title: "Quality",
      items: [
        { id: "testing",   label: "Testing",  icon: "Activity" },
        { id: "launch",    label: "Launch",   icon: "Send" },
        { id: "security",  label: "Security", icon: "Lock" },
      ],
    },
    {
      title: "Growth",
      items: [
        { id: "marketing", label: "Marketing", icon: "Trend" },
        { id: "analytics", label: "Analytics", icon: "Chart" },
      ],
    },
    {
      title: "Help",
      items: [
        { id: "support",   label: "Support",   icon: "Help" },
      ],
    },
  ];

  const renderLink = (l) => {
    const I = Ic[l.icon] || Ic.Home;
    const isActive = page === l.id;
    const showSub = isActive && l.subItems && !compact;
    return (
      <React.Fragment key={l.id}>
        <a title={l.label} data-label={l.label} className={"sb-link" + (isActive ? " active" : "")} onClick={() => setPage(l.id)}>
          <span className="sb-link-icon"><I/></span>
          <span>{l.label}</span>
          {l.badge && <span className="sb-badge">{l.badge}</span>}
          {l.subItems && !compact && (
            <span className={"sb-caret" + (showSub ? " open" : "")}><Ic.ChevDn/></span>
          )}
        </a>
        {showSub && (
          <div className="sb-sub">
            {l.subItems.map((s) => {
              const SI = Ic[s.ic] || Ic.Activity;
              const subActive = (sub || "tests") === s.id;
              return (
                <a
                  key={s.id}
                  className={"sb-sublink" + (subActive ? " active" : "")}
                  onClick={() => setPage(l.id, s.id)}
                >
                  <span className="sb-sublink-tick"/>
                  <span className="sb-sublink-icon"><SI/></span>
                  <span>{s.label}</span>
                  {s.live && <span className="sb-live-dot"/>}
                </a>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <aside className={"sidebar" + (compact ? " compact" : "")}>
      <a
        className="sb-logo"
        title="Go to Home"
        onClick={(e) => { e.preventDefault(); setPage("home"); }}
        href="#home"
        style={{ cursor: "pointer" }}
      >
        <img className="sb-logo-img" src="assets/logo-primary.png" alt="AppsBuiltWithAI" />
      </a>

      <button className="btn btn-coral sb-new" onClick={() => setPage("editor")}>
        <Ic.Plus/> <span>New app</span>
      </button>

      {sections.map((sec) => (
        <React.Fragment key={sec.title}>
          <div className="sb-section">{sec.title}</div>
          <nav className="sb-nav">
            {sec.items.map(renderLink)}
          </nav>
        </React.Fragment>
      ))}

      <div className="sb-spacer"></div>

      {!compact && (
        <button className="sb-refer-card" onClick={onShare}>
          <div className="sb-refer-emoji">🎁</div>
          <div className="sb-refer-text">
            <strong>Invite friends</strong>
            <span>Earn <em>50</em> credits each</span>
          </div>
          <span className="sb-refer-arrow"><Ic.ArrowR size={12}/></span>
        </button>
      )}
      {compact && (
        <button className="sb-refer-mini" onClick={onShare} title="Invite friends · earn credits">
          🎁
        </button>
      )}

      <div
        className="sb-user"
        onClick={() => setPage("settings", "profile")}
        role="button"
        tabIndex={0}
        title="Open profile"
      >
        <div className="sb-avatar">M</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="sb-user-name">Mei Chen</div>
          <div className="sb-user-plan">Pro · 572 credits left</div>
        </div>
        <span className="sb-user-caret"><Ic.ArrowR size={12}/></span>
      </div>
    </aside>
  );
}

/* ============= REUSABLE: TOPBAR ============= */
function Topbar({ crumbs, setPage }) {
  const [showCmd, setShowCmd] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [cmdQ, setCmdQ] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowCmd((v) => !v); }
      if (e.key === "Escape") { setShowCmd(false); setShowNotif(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cmds = [
    { label: "Go to Apps",       page: "home",      ic: "Home"      },
    { label: "Plan a new app",   page: "plan",      ic: "Templates" },
    { label: "Open Editor",      page: "editor",    ic: "Spark"     },
    { label: "Browse Templates", page: "templates", ic: "Templates" },
    { label: "Testing agent",    page: "testing",   ic: "Activity"  },
    { label: "Launch agent",     page: "launch",    ic: "Spark"     },
    { label: "Marketing hub",    page: "marketing", ic: "Activity"  },
    { label: "Open Analytics",   page: "analytics", ic: "Chart"     },
    { label: "Manage Team",      page: "team",      ic: "Users"     },
    { label: "Security",         page: "security",  ic: "Lock"      },
    { label: "Support desk",     page: "support",   ic: "Help"      },
    { label: "Settings",         page: "settings",  ic: "Settings"  },
  ];
  const filtered = !cmdQ ? cmds : cmds.filter((c) => c.label.toLowerCase().includes(cmdQ.toLowerCase()));

  return (
    <>
      <div className="topbar">
        <div className="crumbs">
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">/</span>}
              <span className={i === crumbs.length - 1 ? "here" : ""}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <button className="topbar-search" onClick={() => setShowCmd(true)} style={{ border: 0, background: 0, padding: 0 }}>
          <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Ic.Search/>
            <input
              readOnly
              placeholder="Search apps, templates, settings…"
              style={{ cursor: "pointer" }}
            />
            <span className="topbar-kbd">⌘K</span>
          </span>
        </button>
        <div className="topbar-icons">
          <button className="icon-btn"><Ic.Help/></button>
          <div style={{ position: "relative" }}>
            <button className="icon-btn" onClick={() => setShowNotif((v) => !v)}><Ic.Bell/><span className="dot"></span></button>
            {showNotif && <NotificationsDropdown onClose={() => setShowNotif(false)}/>}
          </div>
        </div>
      </div>

      {showCmd && (
        <CommandPalette
          q={cmdQ}
          setQ={setCmdQ}
          items={filtered}
          onPick={(p) => { setShowCmd(false); setCmdQ(""); setPage(p); }}
          onClose={() => { setShowCmd(false); setCmdQ(""); }}
        />
      )}
    </>
  );
}

/* ============= COMMAND PALETTE ============= */
function CommandPalette({ q, setQ, items, onPick, onClose }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [q]);
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, items.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && items[idx]) { onPick(items[idx].page); }
  };
  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input">
          <Ic.Search/>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a command or search…"
          />
          <span className="topbar-kbd">esc</span>
        </div>
        <div className="cmd-list">
          {items.length === 0 ? (
            <div style={{ padding: "20px 16px", color: "var(--ink-3)", fontSize: 13, textAlign: "center" }}>No matches</div>
          ) : items.map((c, i) => {
            const I = Ic[c.ic];
            return (
              <div
                key={c.label}
                className={"cmd-item" + (i === idx ? " active" : "")}
                onMouseEnter={() => setIdx(i)}
                onClick={() => onPick(c.page)}
              >
                <span className="cmd-item-ic"><I/></span>
                <span>{c.label}</span>
                {i === idx && <span style={{ marginLeft: "auto", fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--ink-3)" }}>↵</span>}
              </div>
            );
          })}
        </div>
        <div className="cmd-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}

/* ============= NOTIFICATIONS ============= */
function NotificationsDropdown({ onClose }) {
  const notifs = [
    { kind: "publish", text: "<strong>Crumb &amp; Co.</strong> got 312 new visitors today", time: "Just now", unread: true },
    { kind: "invite",  text: "<strong>Sarah Lin</strong> accepted your invite",                time: "2 hours ago", unread: true },
    { kind: "edit",    text: "Build complete for <strong>Stillpoint</strong>",                   time: "Yesterday" },
    { kind: "publish", text: "Domain <strong>crumbandco.com</strong> is verified",               time: "2 days ago" },
  ];
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 60 }} onClick={onClose}></div>
      <div className="notif-dd" onClick={(e) => e.stopPropagation()}>
        <div className="notif-head">
          <strong>Notifications</strong>
          <a style={{ fontSize: 12, color: "var(--ink-3)", cursor: "pointer" }}>Mark all read</a>
        </div>
        <div className="notif-list">
          {notifs.map((n, i) => {
            const Icon = n.kind === "publish" ? <Ic.Globe/> : n.kind === "invite" ? <Ic.Users/> : <Ic.Code/>;
            return (
              <div key={i} className={"notif-item" + (n.unread ? " unread" : "")}>
                <div className={"activity-dot " + n.kind}>{Icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="activity-text" dangerouslySetInnerHTML={{ __html: n.text }}></div>
                  <div className="activity-time">{n.time}</div>
                </div>
                {n.unread && <span className="notif-unread-dot"></span>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ============= REFER & SHARE MODAL ============= */
function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const link = "appsbuilt.ai/r/mei-chen";
  const fullLink = "https://" + link;

  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(fullLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Lightweight deterministic QR-like grid (decorative — real apps use a QR lib)
  const qr = useMemo(() => {
    const seed = Array.from(fullLink).reduce((a, c) => a + c.charCodeAt(0), 0);
    const N = 25;
    const cells = new Array(N * N).fill(false);
    let x = seed >>> 0;
    for (let i = 0; i < N * N; i++) {
      x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
      cells[i] = (x & 1) === 1;
    }
    // Finder patterns (corners)
    [[0, 0], [0, N - 7], [N - 7, 0]].forEach(([cy, cx]) => {
      for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
        const i = (cy + r) * N + (cx + c);
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        cells[i] = edge || center;
      }
    });
    return { N, cells };
  }, [fullLink]);

  const friends = [
    { name: "Sarah Lin",   when: "joined 3 days ago", earned: 50, av: "SL", tint: "rose" },
    { name: "Devon Park",  when: "joined last week",  earned: 50, av: "DP", tint: "warm" },
    { name: "Marcus Webb", when: "joined Apr 22",     earned: 50, av: "MW", tint: "plum" },
  ];

  const channels = [
    { id: "email",  label: "Email",     ic: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> },
    { id: "x",      label: "Post on X", ic: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2H21l-6.494 7.422L22 22h-6.844l-4.793-6.27L4.8 22H2l6.94-7.93L2 2h6.914l4.348 5.745L18.244 2Zm-1.2 18h1.82L7.012 4H5.11L17.044 20Z"/></svg> },
    { id: "li",     label: "LinkedIn",  ic: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg> },
    { id: "discord",label: "Discord",   ic: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.42-2.157 2.42Z"/></svg> },
  ];

  // Floating coin / sparkle confetti surrounding the modal — purely decorative
  const confetti = useMemo(() => {
    // Pre-computed positions so layout is stable across renders
    return [
      { kind: "coin",    x: "6%",  y: "12%", size: 64, rot: -18, delay: ".0s",  dur: "11s" },
      { kind: "coin",    x: "88%", y: "8%",  size: 52, rot: 22,  delay: "1.2s", dur: "9s"  },
      { kind: "coin",    x: "4%",  y: "68%", size: 72, rot: 14,  delay: ".6s",  dur: "13s" },
      { kind: "coin",    x: "92%", y: "62%", size: 58, rot: -8,  delay: "1.8s", dur: "10s" },
      { kind: "coin",    x: "14%", y: "88%", size: 44, rot: 28,  delay: "2.3s", dur: "12s" },
      { kind: "coin",    x: "82%", y: "90%", size: 50, rot: -24, delay: ".9s",  dur: "11.5s" },
      { kind: "sparkle", x: "20%", y: "26%", size: 14, delay: ".4s" },
      { kind: "sparkle", x: "78%", y: "30%", size: 18, delay: "1.1s" },
      { kind: "sparkle", x: "12%", y: "48%", size: 12, delay: "1.7s" },
      { kind: "sparkle", x: "86%", y: "44%", size: 16, delay: ".2s" },
      { kind: "sparkle", x: "22%", y: "78%", size: 14, delay: "2.0s" },
      { kind: "sparkle", x: "74%", y: "76%", size: 12, delay: ".7s" },
      { kind: "ring",    x: "2%",  y: "38%", size: 110, delay: ".0s" },
      { kind: "ring",    x: "94%", y: "20%", size: 90,  delay: ".4s" },
    ];
  }, []);

  return (
    <div className="invite2-overlay" onClick={onClose}>
      {/* Designed backdrop — gold/coral bloom + floating confetti */}
      <div className="invite2-backdrop" aria-hidden="true">
        <div className="invite2-bloom invite2-bloom-1"/>
        <div className="invite2-bloom invite2-bloom-2"/>
        {confetti.map((c, i) => {
          if (c.kind === "coin") {
            return (
              <span
                key={i}
                className="invite2-coin"
                style={{
                  left: c.x, top: c.y,
                  width: c.size, height: c.size,
                  ["--rot"]: c.rot + "deg",
                  animationDelay: c.delay,
                  animationDuration: c.dur,
                }}
              >
                <span className="invite2-coin-face">+50</span>
              </span>
            );
          }
          if (c.kind === "sparkle") {
            return (
              <svg
                key={i}
                className="invite2-sparkle"
                style={{ left: c.x, top: c.y, width: c.size, height: c.size, animationDelay: c.delay }}
                viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
              >
                <path d="M12 0 13.6 9.2 22.8 10.8 13.6 12.4 12 21.6 10.4 12.4 1.2 10.8 10.4 9.2 12 0Z"/>
              </svg>
            );
          }
          // ring
          return (
            <span
              key={i}
              className="invite2-ring"
              style={{ left: c.x, top: c.y, width: c.size, height: c.size, animationDelay: c.delay }}
            />
          );
        })}
      </div>

      <div className="invite2" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="invite2-h">
        <button className="invite2-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {/* Hero gradient band */}
        <div className="invite2-hero">
          <div className="invite2-hero-bloom"/>
          <div className="invite2-eyebrow">Give 50 · Get 50</div>
          <h2 id="invite2-h" className="invite2-h">
            Invite a friend.<br/>
            <em>Both of you get credits.</em>
          </h2>
          <p className="invite2-sub">
            For every friend who builds their first app, you both get
            <strong> 50 bonus credits</strong> — enough for a couple of full builds.
          </p>
        </div>

        {/* Share row: QR + link + channels */}
        <div className="invite2-body">
          <div className="invite2-share">
            <div className="invite2-qr-card">
              <svg viewBox={`0 0 ${qr.N} ${qr.N}`} className="invite2-qr-svg" shapeRendering="crispEdges" aria-label="QR code">
                <rect width={qr.N} height={qr.N} fill="#fff"/>
                {qr.cells.map((on, i) => on ? (
                  <rect key={i} x={i % qr.N} y={Math.floor(i / qr.N)} width="1" height="1" fill="#181818"/>
                ) : null)}
              </svg>
              <div className="invite2-qr-caption">Scan to open</div>
            </div>

            <div className="invite2-share-right">
              <div className="invite2-field-label">Your invite link</div>
              <div className="invite2-link-row">
                <span className="invite2-link-proto">https://</span>
                <input className="invite2-link-input" value={link} readOnly onClick={(e) => e.target.select()}/>
                <button className={"invite2-copy" + (copied ? " copied" : "")} onClick={copy}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>

              <div className="invite2-channels">
                {channels.map((c) => (
                  <button key={c.id} className="invite2-channel" title={c.label}>
                    <span className="ic">{c.ic}</span>
                    <span className="lbl">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="invite2-stats">
            <div className="invite2-stat">
              <div className="num">3</div>
              <div className="lbl">Friends joined</div>
            </div>
            <div className="invite2-stat featured">
              <div className="num">150</div>
              <div className="lbl">Credits earned</div>
            </div>
            <div className="invite2-stat">
              <div className="num">$15</div>
              <div className="lbl">Off next bill</div>
            </div>
          </div>

          {/* Milestone progress */}
          <div className="invite2-progress">
            <div className="invite2-progress-head">
              <span className="invite2-progress-label">
                <strong>3 of 10</strong> friends · next milestone bonus
              </span>
              <span className="invite2-progress-reward">+500 credits</span>
            </div>
            <div className="invite2-progress-track">
              <div className="invite2-progress-fill" style={{ width: "30%" }}/>
              {[3, 5, 10].map((m) => (
                <span
                  key={m}
                  className={"invite2-progress-pin" + (3 >= m ? " hit" : "")}
                  style={{ left: (m * 10) + "%" }}
                >
                  <span className="dot"/>
                  <span className="tip">{m}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Friends already in */}
          <div className="invite2-friends">
            <div className="invite2-friends-head">
              <span>Friends already in</span>
              <a className="invite2-friends-link">See all →</a>
            </div>
            <div className="invite2-friends-list">
              {friends.map((f) => (
                <div key={f.name} className="invite2-friend">
                  <div className={"invite2-friend-av tint-" + f.tint}>{f.av}</div>
                  <div className="meta">
                    <div className="name">{f.name}</div>
                    <div className="when">{f.when}</div>
                  </div>
                  <div className="earned">+{f.earned}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="invite2-foot">
            Credits expire after 90 days · max 50 friends per year ·{" "}
            <a>Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PoofD = { useState, useEffect, useRef, useMemo, Ic, APPS, ACTIVITY, Sidebar, Topbar, ShareModal };
