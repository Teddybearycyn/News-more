import SEO from "../components/SEO.tsx";

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description="Comprehensive Terms of Service for News More. Detailed breakdown of user responsibilities, intellectual property, and professional disclaimers." />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-display font-medium mb-12">Terms of Service<span className="text-orange-500">.</span></h1>
        
        <div className="prose prose-invert prose-orange max-w-none text-white/60 space-y-10">
          <section>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>News More</strong>! <br />
              These terms and conditions outline the rules and regulations for the use of News More's Website, located at newsmore.com.
              By accessing this website we assume you accept these terms and conditions. Do not continue to use News More if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">1. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, News More and/or its licensors own all the intellectual property rights and materials contained in this Website. 
              You are granted a limited license only for purposes of viewing the material contained on this Website.
            </p>
            <p className="mt-4 font-bold text-white/80">You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from News More</li>
              <li>Sell, rent or sub-license material from News More</li>
              <li>Reproduce, duplicate or copy material from News More</li>
              <li>Redistribute content from News More</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">2. User Conduct & Comments</h2>
            <p>
              Parts of this website may offer an opportunity for users to post and exchange opinions and information in certain areas of the website. News More does not filter, edit, publish or review Comments prior to their presence on the website.
            </p>
            <p className="mt-4">
              News More reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">3. Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-white/40">
              <li>Government agencies; Search engines; News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
            </ul>
          </section>

          <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl text-white font-medium mb-4 text-orange-500">4. Professional Disclaimer (E-E-A-T)</h2>
            <p className="italic">
              The information provided on News More regarding technical engineering, IT support, and career freelancing is for <strong>educational and informational purposes only</strong>.
            </p>
            <p className="mt-4">
              While we strive to provide high-quality and accurate content, News More makes no warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. News More will not be liable for any losses and/or damages in connection with the use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">5. Content Liability</h2>
            <p>
              We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">6. Reservation of Rights</h2>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-medium mb-4 border-b border-white/10 pb-2">7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the State/Country in which News More operates, and you submit to the non-exclusive jurisdiction of the state and federal courts located in that jurisdiction for the resolution of any disputes.
            </p>
          </section>

          <section className="border-t border-white/10 pt-12">
            <h2 className="text-2xl text-white font-medium mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any queries regarding any of our terms, please contact us at:
            </p>
            <a href="mailto:info.axelionscale@gmail.com" className="text-orange-500 font-bold text-xl underline">info.axelionscale@gmail.com</a>
          </section>
        </div>
      </div>
    </>
  );
}
