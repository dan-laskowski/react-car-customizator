import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkeletonScreen from './SkeletonScreen';

describe('SkeletonScreen', () => {
  it('renders a main landmark marked as busy', () => {
    render(<SkeletonScreen />);

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-busy', 'true');
  });

  it('announces loading status to assistive technology', () => {
    render(<SkeletonScreen />);

    expect(
      screen.getByRole('status', { name: 'Loading car configurator.' }),
    ).toBeInTheDocument();
  });

  it('applies the pulse animation classes to the root element', () => {
    render(<SkeletonScreen />);

    const main = screen.getByRole('main');
    expect(main.className).toContain('animate-pulse');
    expect(main.className).toContain('motion-reduce:animate-none');
  });

  it('renders two layout sections mirroring the loaded Form/Summary order', () => {
    const { container } = render(<SkeletonScreen />);

    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(2);

    expect(sections[0].className).toContain('order-last');
    expect(sections[0].className).toContain('md:order-first');

    expect(sections[1].className).toContain('order-first');
    expect(sections[1].className).toContain('md:order-last');
  });

  it('renders the expected number of placeholder blocks in the form section', () => {
    const { container } = render(<SkeletonScreen />);
    const [formSection] = container.querySelectorAll('section');

    // Four "model" placeholders, two "engine", two "gearbox" placeholders
    const optionPlaceholders = formSection.querySelectorAll(
      '.h-12.p-4.m-2',
    );
    expect(optionPlaceholders).toHaveLength(4 + 2 + 2);

    // Five color swatch placeholders
    const colorPlaceholders = formSection.querySelectorAll('.h-20.w-20');
    expect(colorPlaceholders).toHaveLength(5);
  });

  it('renders the expected number of placeholder blocks in the summary section', () => {
    const { container } = render(<SkeletonScreen />);
    const sections = container.querySelectorAll('section');
    const summarySection = sections[1];

    const specPlaceholders = summarySection.querySelectorAll(
      '.flex.flex-col.items-center.gap-2',
    );
    expect(specPlaceholders).toHaveLength(3);
  });

  it('does not render any visible skeleton text content', () => {
    const { container } = render(<SkeletonScreen />);
    // Only the sr-only status text should contain text content.
    const visibleText = Array.from(container.querySelectorAll('main > *'))
      .filter((node) => node.tagName.toLowerCase() !== 'p')
      .map((node) => node.textContent)
      .join('');
    expect(visibleText.trim()).toBe('');
  });
});