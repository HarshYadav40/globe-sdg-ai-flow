import { useState } from 'react';
import { Search, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { Globe } from '@/components/Globe';
import { AIChat } from '@/components/AIChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_COUNTRIES, SDG_GOALS, getScoreColor, getScoreStatus } from '@/data/sdgData';
import { analyzeSDGData } from '@/lib/gemini';
import { toast } from 'sonner';

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const countryData = SAMPLE_COUNTRIES.find(c => c.name === selectedCountry);

  const handleCountrySelect = async (country: string) => {
    setSelectedCountry(country);
    setIsLoadingInsight(true);
    
    try {
      const insight = await analyzeSDGData(country);
      setAiInsight(insight);
    } catch (error) {
      console.error('Failed to get AI insight:', error);
      toast.error('Failed to load AI insights');
    } finally {
      setIsLoadingInsight(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text">
              🌎 Tracking the world's journey
            </h1>
            <p className="text-3xl md:text-4xl text-muted-foreground">
              to a sustainable future
            </p>
          </div>

          {/* Globe */}
          <div className="w-full max-w-2xl mx-auto h-[400px] mb-12">
            <Globe />
          </div>

          {/* Search & Quick Actions */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Select value={selectedCountry} onValueChange={handleCountrySelect}>
                  <SelectTrigger className="glass-card h-14 text-lg">
                    <SelectValue placeholder="🔍 Select a Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {SAMPLE_COUNTRIES.map(country => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="lg"
                onClick={() => setShowAIChat(true)}
                className="hover-glow h-14 px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Ask SDG AI
              </Button>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" className="glass-card hover-glow">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top 5 Performing Nations
              </Button>
              <Button variant="secondary" className="glass-card hover-glow">
                <TrendingDown className="w-4 h-4 mr-2" />
                Least Progressing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Country Dashboard */}
      {countryData && (
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {countryData.flag} {countryData.name}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Global Rank: #{countryData.rank} • Overall Score: {countryData.overallScore.toFixed(1)}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-bold ${getScoreColor(countryData.overallScore)}`}>
                    {countryData.overallScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getScoreStatus(countryData.overallScore)}
                  </div>
                </div>
              </div>

              {/* SDG Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {countryData.sdgs.map((sdg) => (
                  <div
                    key={sdg.id}
                    className="glass-card p-4 hover-glow cursor-pointer transition-all"
                    style={{ borderLeftColor: sdg.color, borderLeftWidth: '4px' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-semibold" style={{ color: sdg.color }}>
                        SDG {sdg.id}
                      </div>
                      <div className={`text-lg font-bold ${getScoreColor(sdg.score)}`}>
                        {sdg.score.toFixed(0)}
                      </div>
                    </div>
                    <div className="text-sm mb-2">{sdg.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      {sdg.trend === 'improving' && <TrendingUp className="w-3 h-3 text-green-400" />}
                      {sdg.trend === 'declining' && <TrendingDown className="w-3 h-3 text-red-400" />}
                      <span className="text-muted-foreground capitalize">{sdg.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              {aiInsight && (
                <div className="glass-card p-6 bg-primary/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">AI Insights</h3>
                  </div>
                  <p className="text-foreground/90 whitespace-pre-wrap">{aiInsight}</p>
                </div>
              )}
              {isLoadingInsight && (
                <div className="glass-card p-6 bg-primary/5 animate-pulse">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary animate-spin" />
                    <span>Analyzing SDG data...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer with live ticker */}
      <footer className="relative py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card py-4 px-6 inline-block">
            <p className="text-sm text-muted-foreground">
              🟢 SDG Tracker • Live since 2015 • Powered by Gemini AI
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat */}
      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}
    </div>
  );
};

export default Index;
