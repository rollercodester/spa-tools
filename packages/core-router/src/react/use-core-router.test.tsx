import { renderHook } from '@testing-library/react';
import { CoreReactRouterContext, CoreReactRouterCtx, INVALID_CONTEXT_ACCESS, navigateStub } from './core-react-router';
import { useCoreRouter } from './use-core-router';

describe('useCoreRouter', () => {
  it('should return the RouterContext value', () => {
    const ctx: CoreReactRouterCtx = {
      activeHash: '',
      activeRoute: null,
      activeState: undefined,
      basePath: '',
      navigate: () => {},
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CoreReactRouterContext.Provider value={ctx}>{children}</CoreReactRouterContext.Provider>
    );

    const { result } = renderHook(() => useCoreRouter(), { wrapper });

    expect(result.current).toBe(ctx);
  });

  it('should throw an error if navigate used outside of provider context', () => {
    const ctx: CoreReactRouterCtx = {
      activeHash: '',
      activeRoute: null,
      activeState: undefined,
      basePath: '',
      navigate: navigateStub,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CoreReactRouterContext.Provider value={ctx satisfies CoreReactRouterCtx}>
        {children}
      </CoreReactRouterContext.Provider>
    );

    const { result } = renderHook(() => useCoreRouter(), { wrapper });

    expect(() => result.current.navigate({ component: <div>Test</div>, path: '/test' })).toThrow(
      INVALID_CONTEXT_ACCESS
    );
  });
});
