import { ImageResponse } from 'next/og';

export const alt = 'LawyerInNepal legal services in Kathmandu, Nepal';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07152A',
          color: '#FFFFFF',
          padding: 72,
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 92,
              height: 92,
              border: '3px solid #D8A11D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              color: '#D8A11D',
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            LI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', fontSize: 50, fontWeight: 800, letterSpacing: 0 }}>
              <span>LAWYER</span>
              <span style={{ color: '#D8A11D' }}>INNEPAL</span>
            </div>
            <div style={{ fontSize: 20, letterSpacing: 5, color: '#D9E2EE' }}>
              JUSTICE. EXPERTISE. TRUST.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ color: '#D8A11D', fontSize: 28, fontWeight: 700 }}>
            Best Law Firm in Kathmandu, Nepal
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 920 }}>
            Legal help for people, families, and businesses.
          </div>
          <div style={{ fontSize: 26, color: '#D9E2EE', maxWidth: 940 }}>
            Criminal defense, divorce, property disputes, company registration,
            FDI, and Supreme Court litigation.
          </div>
        </div>
      </div>
    ),
    size
  );
}
