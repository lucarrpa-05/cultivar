// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { keyAction, type KeyCtx } from '@/app/keys';

const feed: KeyCtx = { tab: 'feed', sheetOpen: false, modifier: false, typing: false };

describe('keyAction', () => {
  it('maps the feed shortcuts', () => {
    expect(keyAction('j', feed)).toBe('next');
    expect(keyAction('ArrowDown', feed)).toBe('next');
    expect(keyAction(' ', feed)).toBe('next');
    expect(keyAction('k', feed)).toBe('prev');
    expect(keyAction('ArrowUp', feed)).toBe('prev');
    expect(keyAction('Enter', feed)).toBe('read');
    expect(keyAction('l', feed)).toBe('like');
    expect(keyAction('s', feed)).toBe('save');
    expect(keyAction('x', feed)).toBe('skip');
    expect(keyAction('h', feed)).toBe('hard');
    expect(keyAction('?', feed)).toBe('help');
  });

  it('ignores unknown keys and shifted letters', () => {
    expect(keyAction('q', feed)).toBeNull();
    expect(keyAction('J', feed)).toBeNull();
    expect(keyAction('toString', feed)).toBeNull();
  });

  it('ignores keys with ctrl, meta or alt held', () => {
    expect(keyAction('s', { ...feed, modifier: true })).toBeNull();
    expect(keyAction('j', { ...feed, modifier: true })).toBeNull();
  });

  it('stays out of inputs, other tabs and open sheets', () => {
    expect(keyAction('j', { ...feed, typing: true })).toBeNull();
    expect(keyAction('j', { ...feed, tab: 'map' })).toBeNull();
    expect(keyAction('l', { ...feed, tab: 'saved' })).toBeNull();
    expect(keyAction('j', { ...feed, sheetOpen: true })).toBeNull();
  });

  it('leaves Enter and Space to a focused button', () => {
    expect(keyAction('Enter', { ...feed, onControl: true })).toBeNull();
    expect(keyAction(' ', { ...feed, onControl: true })).toBeNull();
    expect(keyAction('j', { ...feed, onControl: true })).toBe('next');
  });
});
