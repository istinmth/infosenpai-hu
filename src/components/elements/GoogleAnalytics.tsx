import Script from 'next/script'

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-22J2B50CWL"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-22J2B50CWL');
        `}
            </Script>
        </>
    )
}

export default GoogleAnalytics