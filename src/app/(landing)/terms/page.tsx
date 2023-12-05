import Link from "next/link";

function TermsOfUse() {
    return (
        <div className="mx-auto max-w-5xl p-4">
            <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
            <p className="mb-4">Welcome to <strong>{"<BitWarriors/>"}</strong> (&quot;the Platform&quot;). By accessing or using the Platform, you agree to comply with and be bound by these Terms of Use. Please read these terms carefully before using our services.</p>

            <h2 className="text-2xl font-bold mb-2">Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using the Platform, you agree to abide by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access the Platform.</p>

            <h2 className="text-2xl font-bold mb-2">Use of the Platform</h2>
            <p className="mb-4">The Platform is intended for personal and non-commercial use. You agree to use the Platform only for its intended purpose of participating in coding challenges, submitting solutions, and engaging with other users within the scope of our <Link className="underline" href="/guidelines">community guidelines</Link>.</p>

            <h2 className="text-2xl font-bold mb-2">User Accounts</h2>
            <p className="mb-4">When creating an account on the Platform, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update this information promptly if there are any changes.</p>

            <h2 className="text-2xl font-bold mb-2">Code of Conduct</h2>
            <p className="mb-4">Users are expected to conduct themselves in a respectful manner while using the Platform. Any behavior that violates our community guidelines, including but not limited to harassment, hate speech, spamming, or posting inappropriate content, may result in the suspension or termination of your account.</p>

            <h2 className="text-2xl font-bold mb-2">Intellectual Property</h2>
            <p className="mb-4">All content provided on the Platform, including but not limited to text, graphics, logos, images, code, and challenges, is the property of <strong>{"<BitWarriors/>"}</strong> or its licensors and is protected by copyright, trademark, and other intellectual property laws. Users may not reproduce, distribute, or modify any content without explicit permission.</p>

            <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
            <p className="mb-4">The Platform and its affiliates, partners, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use or inability to use the Platform, including but not limited to errors, inaccuracies, or interruptions in service.</p>

            <h2 className="text-2xl font-bold mb-2">Changes to Terms</h2>
            <p className="mb-4">We reserve the right to modify, update, or revise these Terms of Use at any time. Your continued use of the Platform after any changes to the terms will signify your acceptance of those changes.</p>

            <h2 className="text-2xl font-bold mb-2">Termination</h2>
            <p className="mb-4">We reserve the right to terminate or suspend access to the Platform at our discretion, without prior notice or liability, for any reason, including but not limited to a breach of these Terms of Use.</p>

            <h2 className="text-2xl font-bold mb-2">Governing Law</h2>
            <p className="mb-4">These Terms of Use shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.</p>

            <p className="mb-4">
                <strong>Contact Us</strong>
                <br />
                If you have any questions or concerns regarding these Terms of Use, please contact us at [contact information].
            </p>
        </div>
    );
}

export default TermsOfUse;