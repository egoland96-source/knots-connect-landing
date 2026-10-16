import { ChevronDown } from "lucide-react";

export default function LegalSection() {
  return (
    <section className="policy-section reveal-on-scroll" id="legal" data-reveal aria-labelledby="policy-title">
      <div className="section-width policy-section__inner">
        <div className="section-kicker"><span>04 / POLICIES &amp; LEGAL</span><span className="section-kicker__rule" /></div>
        <div className="policy-section__heading">
          <div>
            <h2 id="policy-title">Policies, terms<br /><em>&amp; notices.</em></h2>
            <p>Review privacy, acceptable use and important service terms.</p>
          </div>
          <aside className="policy-review-note" role="note">
            <span>OWNER-PROVIDED DRAFT · REVIEW REQUIRED</span>
            <p>Zero-log, zero-knowledge, data-handling and liability statements below have not been independently verified. Confirm them against current product behavior and applicable law before publication.</p>
          </aside>
        </div>

        <div className="policy-list">
          <details className="policy-card" id="privacy-policy">
            <summary>
              <span className="policy-card__number">01</span>
              <span className="policy-card__title"><strong>Privacy Policy</strong><small>Gizlilik Politikası · Data handling and identity</small></span>
              <ChevronDown className="policy-card__chevron" size={18} aria-hidden="true" />
            </summary>
            <div className="policy-card__body">
              <article>
                <h3>1. Core Philosophy &amp; Zero-Log Architecture</h3>
                <p>Knots Connect is engineered ground-up on a Zero-Log and Zero-Knowledge architecture. We operate on a fundamental principle: what you do on the internet is none of our business. We do not track, collect, inspect, or store your browsing history, traffic destinations, data content, IP addresses, or DNS queries. The moment your network traffic leaves your device, it is encrypted and routed without leaving any trace on our control servers.</p>
              </article>
              <article>
                <h3>2. Identity &amp; Account Management</h3>
                <p>Unlike traditional services, Knots Connect does not require personal identifiers such as your real name, email address, phone number, or payment profiles.</p>
                <p>Your system identity is defined solely by a 16-character cryptographic Knots ID, generated locally on your client machine.</p>
                <p>We do not maintain user databases linked to real-world identities.</p>
                <p>Because your Knots ID is generated and stored locally, we cannot cross-reference your network activity with any individual.</p>
              </article>
              <article>
                <h3>3. Local Routing &amp; Data Handling</h3>
                <p>Our signature Smart Split Routing technology processes network rules locally on your operating system.</p>
                <p>Decisions regarding which traffic routes through the encrypted Knots tunnel and which remains on your local ISP network are computed entirely on your device.</p>
                <p>No telemetric data or routing logs are transmitted back to central infrastructure.</p>
              </article>
              <article>
                <h3>4. Third-Party Requests &amp; Government Inquiries</h3>
                <p>Because we do not store connection logs, timestamps, active sessions, or IP allocations, we have zero data to provide to third parties, law enforcement agencies, or court orders. We cannot hand over what we do not possess.</p>
              </article>
            </div>
          </details>

          <details className="policy-card" id="terms-of-service">
            <summary>
              <span className="policy-card__number">02</span>
              <span className="policy-card__title"><strong>Terms of Service</strong><small>Kullanım Koşulları · Service scope and acceptable use</small></span>
              <ChevronDown className="policy-card__chevron" size={18} aria-hidden="true" />
            </summary>
            <div className="policy-card__body">
              <article>
                <h3>1. Acceptance of Terms &amp; Service Scope</h3>
                <p>By downloading, installing, or utilizing the Knots Connect client, you agree to these Terms of Service. Knots Connect provides decentralized, encrypted network utility software intended to enhance user privacy, bypass artificial network restrictions, and optimize latency.</p>
              </article>
              <article>
                <h3>2. Acceptable Use Policy</h3>
                <p>Knots Connect is built to foster a free and accessible internet. However, you agree not to use the infrastructure for malicious purposes, including but not limited to:</p>
                <ul>
                  <li>Performing Distributed Denial of Service (DDoS) attacks or network disruptions.</li>
                  <li>Automated spamming, botnet operations, or unauthorized intrusion into third-party networks.</li>
                  <li>Distribution of illegal content or activities that violate fundamental digital regulations.</li>
                </ul>
                <p>We reserve the right to block specific network signatures at the infrastructure level to protect overall network integrity without monitoring individual user sessions.</p>
              </article>
              <article>
                <h3>3. Cryptographic Key Management &amp; Loss</h3>
                <p>Your 16-character Knots ID serves as your unique cryptographic key. Because our system contains no email recovery, password reset flows, or central user databases:</p>
                <ul>
                  <li>You are solely responsible for securing and backing up your Knots ID.</li>
                  <li>Knots Connect administrators cannot recover, reset, or restore lost or corrupted Knots IDs under any circumstances.</li>
                </ul>
              </article>
            </div>
          </details>

          <details className="policy-card" id="legal-disclaimer">
            <summary>
              <span className="policy-card__number">03</span>
              <span className="policy-card__title"><strong>Legal Disclaimer &amp; Limitation of Liability</strong><small>Sorumluluk Reddi · Performance and third-party services</small></span>
              <ChevronDown className="policy-card__chevron" size={18} aria-hidden="true" />
            </summary>
            <div className="policy-card__body">
              <article>
                <h3>1. “As-Is” Provision &amp; Network Performance</h3>
                <p>Knots Connect is provided on an “as-is” and “as-available” basis without warranties of any kind, whether express or implied. While our system is optimized for high-throughput and low-latency routing:</p>
                <ul>
                  <li>Internet performance depends on external variables, including ISP throttling, regional physical infrastructure failure, and third-party server loads.</li>
                  <li>We do not guarantee uninterrupted service or 100% uptime under all local network conditions.</li>
                </ul>
              </article>
              <article>
                <h3>2. Limitation of Liability</h3>
                <p>To the maximum extent permitted by applicable law, Knots Connect and its maintainers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the software, loss of access keys, or third-party service disruptions.</p>
              </article>
              <article>
                <h3>3. Third-Party Websites &amp; Ecosystems</h3>
                <p>Network traffic routed through Knots Connect may interact with external websites, applications, and services. Knots Connect exercises no control over, and assumes no responsibility for, the privacy practices, content, or terms of third-party platforms.</p>
              </article>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
