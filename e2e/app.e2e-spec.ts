import { DashboardPedidoPage } from './app.po';

describe('dashboard-pedido App', function() {
  let page: DashboardPedidoPage;

  beforeEach(() => {
    page = new DashboardPedidoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
