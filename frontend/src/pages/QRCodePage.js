import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Download, Share2, CreditCard } from 'lucide-react';

const QRCodePage = () => {
  const websiteURL = 'https://himachal-breaking.preview.emergentagent.com';
  
  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1200;
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add logo
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = 'https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png';
      
      logoImg.onload = () => {
        // Draw logo at top
        ctx.drawImage(logoImg, 250, 50, 500, 150);
        
        // Add text
        ctx.fillStyle = '#1a2a4a';
        ctx.font = 'bold 48px Playfair Display';
        ctx.textAlign = 'center';
        ctx.fillText('Live Point News', canvas.width / 2, 250);
        
        ctx.font = '24px IBM Plex Sans';
        ctx.fillStyle = '#C8102E';
        ctx.fillText('Scan to Visit Website', canvas.width / 2, 290);
        
        // Draw QR code
        ctx.drawImage(img, 150, 320, 700, 700);
        
        // Add URL at bottom
        ctx.fillStyle = '#1a2a4a';
        ctx.font = '20px IBM Plex Sans';
        ctx.fillText(websiteURL, canvas.width / 2, 1080);
        
        ctx.font = 'bold 18px IBM Plex Sans';
        ctx.fillText('TRUSTED • TIMELY • TRANSPARENT', canvas.width / 2, 1120);
        
        // Download
        const link = document.createElement('a');
        link.download = 'LivePointNews-QRCode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-4" data-testid="qr-page-title">
            Official QR Code
          </h1>
          <p className="text-lg text-muted-foreground">
            Scan to visit Live Point News website instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* QR Code Display */}
          <div className="bg-white rounded-lg border-2 border-primary p-8 shadow-2xl">
            <div className="text-center mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png" 
                alt="Live Point News"
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold playfair mb-2">Live Point News</h2>
              <p className="text-sm text-primary font-bold">TRUSTED • TIMELY • TRANSPARENT</p>
            </div>

            <div className="flex justify-center mb-6 p-8 bg-white rounded-lg">
              <QRCodeSVG
                id="qr-code-svg"
                value={websiteURL}
                size={350}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: "https://customer-assets.emergentagent.com/job_himachal-breaking/artifacts/vxbtuj6d_1784024059432.png",
                  height: 60,
                  width: 60,
                  excavate: true,
                }}
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">{websiteURL}</p>
              <button
                onClick={downloadQR}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                data-testid="download-qr-button"
              >
                <Download size={20} />
                <span>Download QR Code (High Resolution)</span>
              </button>
            </div>
          </div>

          {/* Usage Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary rounded-lg">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold playfair mb-2">Agent ID Cards</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Perfect for printing on agent identification cards. The QR code includes error correction 
                    to work even if partially damaged or obscured.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-6 border border-secondary/20">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Share2 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold playfair mb-2">Marketing Materials</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Use on posters, flyers, business cards, and promotional materials. Anyone can scan 
                    to instantly access Live Point News.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-border shadow-lg">
              <h3 className="text-xl font-bold playfair mb-4">How to Use</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Click "Download QR Code" to get high-resolution image</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Print on ID cards, posters, or marketing materials</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span>Users scan with smartphone camera to visit website instantly</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold playfair mb-2">Print Specifications</h3>
              <ul className="space-y-2 text-sm">
                <li>• Resolution: 1000x1200px (High Quality)</li>
                <li>• Format: PNG with transparent background</li>
                <li>• Size: Recommended 2-3 inches for ID cards</li>
                <li>• Error Correction: Level H (30% damage tolerance)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QRCodePage;
