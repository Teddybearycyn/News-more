import SEO from "../components/SEO.tsx";

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Comprehensive Privacy Policy for News More. Learn how we protect your data and stay compliant with global standards." />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-display font-medium mb-12">Privacy Policy<span className="text-orange-500">.</span></h1>
        
        <div className="prose prose-invert prose-orange max-w-none text-white/60 space-y-8">
          <section>
            <p className="text-lg leading-relaxed">
              Last updated: April 23, 2026. <br />
              At <strong>News More</strong>, accessible from newsmore.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by News More and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">1. General Data Protection Regulation (GDPR)</h2>
            <p>
              We are a Data Controller of your information. News More legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>News More needs to perform a contract with you</li>
              <li>You have given News More permission to do so</li>
              <li>Processing your personal information is in News More legitimate interests</li>
              <li>News More needs to comply with the law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">2. Log Files</h2>
            <p>
              News More follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">3. Cookies and Web Beacons</h2>
            <p>
              Like any other website, News More uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">4. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-orange-500 underline">https://policies.google.com/technologies/ads</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">5. Our Advertising Partners</h2>
            <p>
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
            </p>
            <ul className="list-disc pl-6">
              <li>Google AdSense</li>
            </ul>
            <p className="mt-4">
              Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">6. Privacy Policies</h2>
            <p>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on News More, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p className="mt-2 text-orange-500/80 italic font-medium">
              Note that News More has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">7. Third Party Privacy Policies</h2>
            <p>
              News More's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p className="mt-2 text-white/50">
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4">8. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p className="mt-2">
              News More does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="border-t border-white/10 pt-12">
            <h2 className="text-2xl text-white font-medium mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </p>
            <a href="mailto:info.axelionscale@gmail.com" className="text-orange-500 font-bold text-xl">info.axelionscale@gmail.com</a>
          </section>
        </div>
      </div>
    </>
  );
}
