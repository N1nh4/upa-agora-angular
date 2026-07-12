import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-politica-privacidade',
  template: `
    <div class="max-w-4xl mx-auto py-6 md:py-10 px-4 text-justify">
      <button (click)="voltar()" class="flex items-center text-green-800 mb-6 hover:underline cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
        Voltar
      </button>

      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center text-green-900">Política de Privacidade</h1>
      <p class="mb-4">Última atualização: 11 de julho de 2025</p>

      <p class="mb-4">Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos os dados dos usuários.</p>

      <p class="mb-4 font-semibold">1. Dados Coletados</p>
      <p class="mb-4">Nome completo, CPF, email, telefone, localização geográfica, data e hora das contribuições.</p>

      <p class="mb-4 font-semibold">2. Finalidade do Tratamento</p>
      <p class="mb-4">Os dados são utilizados para identificar usuários confiáveis, validar contribuições e exibir informações no mapa interativo.</p>

      <p class="mb-4 font-semibold">3. Base Legal (LGPD)</p>
      <p class="mb-4">Consentimento do usuário (art. 7º, I), legítimo interesse (art. 7º, IX) e proteção da saúde (art. 11, II, c).</p>

      <p class="mb-4 font-semibold">4. Armazenamento e Proteção</p>
      <p class="mb-4">Dados sensíveis são armazenados com criptografia.</p>

      <p class="mb-4 font-semibold">5. Compartilhamento</p>
      <p class="mb-4">Os dados não são compartilhados com terceiros, salvo obrigação legal.</p>

      <p class="mb-4 font-semibold">6. Direitos do Titular</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Confirmar existência de tratamento</li>
        <li>Acessar, corrigir ou excluir seus dados</li>
        <li>Revogar consentimento a qualquer momento</li>
      </ul>

      <p class="mb-4 font-semibold">7. Retenção</p>
      <p class="mb-4">Os dados serão mantidos enquanto a conta estiver ativa.</p>

      <p class="mb-4 font-semibold">8. Cookies</p>
      <p class="mb-4">Poderemos utilizar cookies para melhorar a navegação.</p>

      <p class="mb-4 font-semibold">9. Atualizações</p>
      <p class="mb-4">Esta Política poderá ser atualizada periodicamente.</p>

      <p class="mb-4 font-semibold">10. Encarregado</p>
      <p class="mb-4">Em caso de dúvidas, entre em contato: alanaabreu1103@gmail.com</p>
    </div>
  `,
})
export class PoliticaPrivacidadeComponent {
  constructor(private location: Location) {}
  voltar() {
    this.location.back();
  }
}
