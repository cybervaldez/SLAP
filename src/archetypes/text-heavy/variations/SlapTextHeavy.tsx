import React from 'react';
import { article } from '../data';
import SearchBar from '../components/SearchBar';
import TOC from '../components/TOC';
import ArticleBody from '../components/ArticleBody';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#2563EB';

export default function SlapTextHeavy() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openSections, setOpenSections] = React.useState<Set<string>>(
    () => new Set(article.sections.map((s) => s.id))
  );
  const [activeSection, setActiveSection] = React.useState<string | null>(
    article.sections[0]?.id ?? null
  );

  const filteredSections = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return article.sections;
    return article.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleToggle = React.useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleTOCSelect = React.useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      setOpenSections((prev) => {
        if (prev.has(sectionId)) return prev;
        const next = new Set(prev);
        next.add(sectionId);
        return next;
      });
      requestAnimationFrame(() => {
        const el = document.getElementById(`section-${sectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },
    []
  );

  const wrapperStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    color: '#111827',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    padding: '32px 40px 24px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 32,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 12px',
    lineHeight: 1.25,
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    flexWrap: 'wrap',
  };

  const metaDotStyle: React.CSSProperties = {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: '#D1D5DB',
  };

  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  };

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 500,
    color: ACCENT,
    backgroundColor: '#EFF6FF',
    borderRadius: 4,
  };

  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    maxWidth: 1100,
    margin: '0 auto',
    padding: '24px 24px',
    gap: 32,
  };

  const sidebarStyle: React.CSSProperties = {
    width: 250,
    flexShrink: 0,
    position: 'sticky',
    top: 24,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    padding: '16px 0',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  return (
    <div data-testid="text-heavy-demo" style={wrapperStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>{article.title}</h1>
        {article.subtitle && (
          <p style={{
            fontSize: 18,
            color: '#6B7280',
            margin: '0 0 16px',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}>
            {article.subtitle}
          </p>
        )}
        <div style={metaStyle}>
          <span>{article.author}</span>
          <span style={metaDotStyle} />
          <span>{article.date}</span>
          <span style={metaDotStyle} />
          <span>{article.readingTime}</span>
        </div>
        <div style={tagsContainerStyle}>
          {article.tags.map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div style={layoutStyle}>
        <aside style={sidebarStyle}>
          <TOC
            sections={filteredSections}
            activeId={activeSection}
            onSelect={handleTOCSelect}
          />
        </aside>

        <main style={mainStyle}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ArticleBody
            sections={filteredSections}
            openSections={openSections}
            onToggle={handleToggle}
            searchQuery={searchQuery}
          />
          {filteredSections.length === 0 && searchQuery.trim() && (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                color: '#9CA3AF',
                fontSize: 15,
              }}
            >
              No sections match &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
