import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { FiExternalLink, FiTrendingUp, FiTarget, FiZap, FiAward } from 'react-icons/fi';

const LEETCODE_USERNAME = "MaharshiPatel24";
const API_BASE = "https://alfa-leetcode-api.onrender.com";

// Total problems on LeetCode (approximate, updates periodically)
const TOTAL_EASY = 876;
const TOTAL_MEDIUM = 1826;
const TOTAL_HARD = 831;

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, solvedRes] = await Promise.all([
          fetch(`${API_BASE}/${LEETCODE_USERNAME}`),
          fetch(`${API_BASE}/${LEETCODE_USERNAME}/solved`),
        ]);

        const profileData = await profileRes.json();
        const solvedData = await solvedRes.json();

        if (solvedData.solvedProblem !== undefined) {
          // Calculate acceptance rate from submission data
          const totalSubmissions = solvedData.totalSubmissionNum?.[0]?.submissions || 0;
          const acceptedSubmissions = solvedData.acSubmissionNum?.[0]?.submissions || 0;
          const acceptanceRate = totalSubmissions > 0
            ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
            : 0;

          setStats({
            totalSolved: solvedData.solvedProblem,
            easySolved: solvedData.easySolved,
            mediumSolved: solvedData.mediumSolved,
            hardSolved: solvedData.hardSolved,
            acceptanceRate,
          });

          setProfile({
            name: profileData.name || "Maharshi Patel",
            avatar: profileData.avatar || null,
            ranking: profileData.ranking || null,
          });

          setIsLive(true);
        } else {
          throw new Error("Invalid data");
        }
      } catch (error) {
        // Fallback to approximate stats if API is temporarily down
        setStats({
          totalSolved: 72,
          easySolved: 60,
          mediumSolved: 10,
          hardSolved: 2,
          acceptanceRate: 85.4,
        });
        setProfile({ name: "Maharshi Patel", avatar: null, ranking: null });
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const difficultyData = stats ? [
    { label: 'Easy', count: stats.easySolved, total: TOTAL_EASY, color: '#10b981', bgColor: '#10b98120' },
    { label: 'Medium', count: stats.mediumSolved, total: TOTAL_MEDIUM, color: '#f59e0b', bgColor: '#f59e0b20' },
    { label: 'Hard', count: stats.hardSolved, total: TOTAL_HARD, color: '#ef4444', bgColor: '#ef444420' },
  ] : [];

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section id="leetcode" className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          // Competitive Coding
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-4"
        >
          LeetCode <span className="gradient-text">Stats</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subheading"
        >
          Consistently solving data structures & algorithms problems
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Profile Card */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
        >
          {/* Avatar or LeetCode icon */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 bg-[#FFA116]/20 rounded-full blur-xl" />
            {profile?.avatar ? (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden glass">
                <img
                  src={profile.avatar}
                  alt="LeetCode Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative p-5 glass rounded-2xl">
                <SiLeetcode className="text-[#FFA116] text-5xl" />
              </div>
            )}
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-2xl font-display font-bold mb-1">
            {profile?.name || "Maharshi Patel"}
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-500 text-sm font-mono mb-2">
            @{LEETCODE_USERNAME}
          </motion.p>

          {/* Live indicator */}
          {isLive && (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-mono uppercase tracking-wider">Live Data</span>
            </motion.div>
          )}

          {/* Total solved - big number */}
          <motion.div variants={itemVariants} className="mb-6">
            <AnimatedCounter value={loading ? 0 : stats?.totalSolved || 0} />
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1">
              Problems Solved
            </p>
          </motion.div>

          <motion.a
            variants={itemVariants}
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#FFA116] text-black font-bold rounded-full magnetic-btn text-sm"
          >
            <FiExternalLink />
            Visit Profile
          </motion.a>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-3 glass-card rounded-2xl p-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <FiTrendingUp className="text-accent text-xl" />
            <h3 className="text-lg font-display font-bold">Problem Breakdown</h3>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {difficultyData.map((item, i) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-sm" style={{ color: item.color }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-lg text-white">
                      {loading ? '0' : item.count}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      / {item.total}
                    </span>
                  </div>
                </div>

                {/* Animated bar */}
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: item.bgColor }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.total ? (item.count / item.total) * 100 : 0}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mini stat cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-8">
            <div className="glass rounded-xl p-4 text-center">
              <FiTarget className="text-accent mx-auto mb-2" />
              <div className="text-xl font-display font-bold text-white">
                {loading ? '...' : `${stats?.acceptanceRate || 0}%`}
              </div>
              <div className="text-xs text-gray-500 font-mono">Acceptance</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <FiZap className="text-neon-cyan mx-auto mb-2" />
              <div className="text-xl font-display font-bold text-white">
                {loading ? '...' : stats?.totalSolved || 0}
              </div>
              <div className="text-xs text-gray-500 font-mono">Total Solved</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <FiAward className="text-[#FFA116] mx-auto mb-2" />
              <div className="text-xl font-display font-bold text-white">
                {loading ? '...' : (profile?.ranking ? `#${profile.ranking.toLocaleString()}` : '—')}
              </div>
              <div className="text-xs text-gray-500 font-mono">Ranking</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Animated Counter Component ── */
function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={countRef} className="text-5xl font-display font-bold gradient-text-static">
      {count}+
    </div>
  );
}

export default LeetCode;
