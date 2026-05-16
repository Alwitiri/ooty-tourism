import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';

const typeStyles = {
  hero: { bg: 'bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white', full: true },
  story: { bg: 'bg-white' },
  mission: { bg: 'bg-primary-50' },
  vision: { bg: 'bg-white' },
  team: { bg: 'bg-gray-50' },
  stat: { bg: 'bg-primary-600 text-white' },
  values: { bg: 'bg-white' },
};

export default function About() {
  const { services } = useContentStore();
  const sections = [...(services.abouts || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  const teamMembers = sections.filter((s) => s.type === 'team');
  const values = sections.filter((s) => s.type === 'values');

  return (
    <div className="min-h-screen">
      {sections.map((sec, i) => {
        const st = typeStyles[sec.type] || { bg: 'bg-white' };

        if (sec.type === 'team' && sections[i - 1]?.type === 'team') return null;
        if (sec.type === 'values' && sections[i - 1]?.type === 'values') return null;

        return (
          <motion.section key={sec.id || i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className={`${st.bg} ${st.full ? 'py-20 md:py-28' : 'py-14 md:py-20'}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

              {sec.type === 'hero' && (
                <div className="text-center">
                  <p className="text-primary-200 text-sm tracking-widest uppercase mb-3">{sec.subtitle}</p>
                  <h1 className="text-4xl md:text-5xl font-bold font-display mb-5">{sec.title}</h1>
                  <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">{sec.content}</p>
                </div>
              )}

              {sec.type === 'stat' && (
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold font-display">{sec.subtitle}</p>
                  <p className="text-primary-200 mt-2 text-sm uppercase tracking-wider">{sec.title}</p>
                </div>
              )}

              {['story', 'mission', 'vision'].includes(sec.type) && (
                <div className={`grid md:grid-cols-${sec.image ? '2' : '1'} gap-10 items-center`}>
                  {sec.image && (
                    <img src={sec.image} alt={sec.title} className="rounded-2xl w-full h-72 object-cover shadow-lg" />
                  )}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 mb-4">{sec.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{sec.content}</p>
                  </div>
                </div>
              )}

              {sec.type === 'team' && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 mb-10 text-center">Meet Our Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                        <img src={member.image} alt={member.title} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 text-lg">{member.title}</h3>
                        <p className="text-sm text-primary-600 font-medium mb-2">{member.subtitle}</p>
                        <p className="text-sm text-gray-500">{member.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sec.type === 'values' && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-gray-900 mb-10 text-center">Our Values</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((v) => (
                      <div key={v.id} className="bg-primary-50 rounded-2xl p-6 text-center">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{v.title}</h3>
                        <p className="text-sm text-gray-600">{v.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
