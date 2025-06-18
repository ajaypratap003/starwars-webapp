import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSwapi, useSwapiAll } from './useSwapi';

const flushPromises = () => new Promise(setImmediate);

describe('useSwapi', () => {
    const mockUrl = 'https://swapi.dev/api/people/1/';
    const mockData = { name: 'Luke Skywalker' };

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('fetches data successfully', async () => {
        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const { result } = renderHook(() => useSwapi(mockUrl));

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(fetch).toHaveBeenCalledWith(mockUrl);
    });

    it('handles fetch error (non-ok response)', async () => {
        (fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const { result } = renderHook(() => useSwapi(mockUrl));

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toContain('HTTP error! status: 404');
        expect(result.current.isLoading).toBe(false);
    });

    it('handles fetch exception', async () => {
        (fetch as any).mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useSwapi(mockUrl));

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe('Network error');
        expect(result.current.isLoading).toBe(false);
    });
});

describe('useSwapiAll', () => {
    const urls = [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
    ];
    const mockResults = [{ name: 'Luke Skywalker' }, { name: 'C-3PO' }];

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('fetches all data successfully', async () => {
        (fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockResults[0],
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockResults[1],
            });

        const { result } = renderHook(() => useSwapiAll(urls));

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toEqual(mockResults);
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(urls[0]);
        expect(fetch).toHaveBeenCalledWith(urls[1]);
    });

    it('handles error if any fetch fails', async () => {
        (fetch as any)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockResults[0],
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

        const { result } = renderHook(() => useSwapiAll(urls));

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toContain('HTTP error! status: 500');
        expect(result.current.isLoading).toBe(false);
    });

    it('handles fetch exception', async () => {
        (fetch as any).mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResults[1],
        });

        const { result } = renderHook(() => useSwapiAll(urls));

        await act(async () => {
            await flushPromises();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe('Network error');
        expect(result.current.isLoading).toBe(false);
    });
});