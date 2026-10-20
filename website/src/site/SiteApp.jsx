import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './SiteLayout.jsx';
import Subpage from './subpage-shell.jsx';
import SiteHomePage from './app.jsx';
import WaitlistSite from './waitlist-app.jsx';
import AboutPage from './about-page.jsx';
import AffiliatePage from './affiliate-page.jsx';
import AffiliateThanksPage from './affiliate-thanks-page.jsx';
import AffiliatesPage from './affiliates-page.jsx';
import CareersPage from './careers-page.jsx';
import CatalystsPage from './catalysts-page.jsx';
import CertifiedBuildersPage from './certified-builders-page.jsx';
import ChangelogPage from './changelog-page.jsx';
import ChapterPage from './chapter-page.jsx';
import CommunityPage from './community-page.jsx';
import ComparePage from './compare-page.jsx';
import ConnectorsMarketingPage from './connectors-marketing-page.jsx';
import CoursePage from './course-page.jsx';
import EducationPage from './education-page.jsx';
import EmbedPage from './embed-page.jsx';
import EventsPage from './events-page.jsx';
import FeaturesPage from './features-page.jsx';
import HowItWorksPage from './how-it-works-page.jsx';
import ImportPage from './import-page.jsx';
import LegalPage from './legal-page.jsx';
import PricingPage from './pricing-page.jsx';
import ResourcesPage from './resources-page.jsx';
import RoadmapPage from './roadmap-page.jsx';
import SecurityPage from './security-page.jsx';
import StatusPage from './status-page.jsx';
import SummitPage from './summit-page.jsx';
import SupportPage from './support-page.jsx';
import TemplatesPage from './templates-page.jsx';
import UseCasesPage from './use-cases-page.jsx';
import VisionPage from './vision-page.jsx';
import AmbassadorPage from './ambassador-page.jsx';
import ContactPage from './contact-page.jsx';
import WaitlistLandingPage from './waitlist-landing-page.jsx';
// import SiteSignUpPage from './signup-page.jsx';

function Shell({ children }) {
  return <Subpage>{children}</Subpage>;
}

export default function SiteApp() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<WaitlistSite />} />
        <Route path="/full-site" element={<SiteHomePage />} />
        <Route path="/about" element={<Shell><AboutPage /></Shell>} />
        <Route path="/affiliate" element={<Shell><AffiliatePage /></Shell>} />
        <Route path="/affiliate-thanks" element={<Shell><AffiliateThanksPage /></Shell>} />
        <Route path="/affiliates" element={<Shell><AffiliatesPage /></Shell>} />
        <Route path="/ambassador" element={<Shell><AmbassadorPage /></Shell>} />
        <Route path="/careers" element={<Shell><CareersPage /></Shell>} />
        <Route path="/catalysts" element={<Shell><CatalystsPage /></Shell>} />
        <Route path="/certified-builders" element={<Shell><CertifiedBuildersPage /></Shell>} />
        <Route path="/changelog" element={<Shell><ChangelogPage /></Shell>} />
        <Route path="/chapter" element={<Shell><ChapterPage /></Shell>} />
        <Route path="/community" element={<Shell><CommunityPage /></Shell>} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/connectors" element={<Shell><ConnectorsMarketingPage /></Shell>} />
        <Route path="/contact" element={<Shell><ContactPage /></Shell>} />
        <Route path="/course" element={<Shell><CoursePage /></Shell>} />
        <Route path="/education" element={<Shell><EducationPage /></Shell>} />
        <Route path="/embed" element={<EmbedPage />} />
        <Route path="/events" element={<Shell><EventsPage /></Shell>} />
        <Route path="/features" element={<Shell><FeaturesPage /></Shell>} />
        <Route path="/how-it-works" element={<Shell><HowItWorksPage /></Shell>} />
        <Route path="/import" element={<Shell><ImportPage /></Shell>} />
        <Route path="/legal" element={<Shell><LegalPage /></Shell>} />
        <Route path="/pricing" element={<Shell><PricingPage /></Shell>} />
        <Route path="/resources" element={<Shell><ResourcesPage /></Shell>} />
        <Route path="/roadmap" element={<Shell><RoadmapPage /></Shell>} />
        <Route path="/security" element={<Shell><SecurityPage /></Shell>} />
        <Route path="/status" element={<Shell><StatusPage /></Shell>} />
        <Route path="/summit" element={<Shell><SummitPage /></Shell>} />
        <Route path="/support" element={<Shell><SupportPage /></Shell>} />
        <Route path="/templates" element={<Shell><TemplatesPage /></Shell>} />
        <Route path="/use-cases" element={<Shell><UseCasesPage /></Shell>} />
        <Route path="/vision" element={<Shell><VisionPage /></Shell>} />
        <Route path="/waitlist-landing" element={<WaitlistLandingPage />} />
        <Route path="/waitlist-site" element={<Navigate to="/" replace />} />
        {/* <Route path="/signup" element={<Shell><SiteSignUpPage /></Shell>} /> */}
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Route>
    </Routes>
  );
}