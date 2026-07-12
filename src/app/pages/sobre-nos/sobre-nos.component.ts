import { Component } from '@angular/core';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-sobre-nos',
  imports: [HeaderComponent],
  template: `
    <app-header [navLinks]="navLinks" />

    <section class="pt-16">
      <div class="w-full min-h-[80px] flex items-center px-6 md:px-28 text-left bg-verdeEscuro">
        <h1 class="text-white font-bold text-xl md:text-2xl">Sobre nós</h1>
      </div>

      <div class="w-11/12 h-auto mt-16 md:mt-32 mx-auto flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 p-4">
          <div class="w-full pt-0 md:pt-10">
            <h1 class="text-3xl font-bold text-[#15553C] text-center md:text-left">Quem Somos</h1>
            <p class="pt-6 md:pt-10 text-justify text-[#35644B]">
              Um grupo de pessoas interessadas em unir conhecimento e tecnologia a favor da sociedade,
              buscando melhorar o acesso à informação sobre a lotação das unidades de saúde e contribuir
              para decisões mais conscientes e informadas dos usuários. Estamos comprometidos em criar
              uma plataforma colaborativa que promova transparência e eficiência no sistema de saúde.
            </p>
            <div class="flex flex-wrap mt-6 md:mt-10 gap-2 justify-center md:justify-start">
              <span class="bg-[#00995D]/20 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Transparência</span>
              <span class="bg-[#5CDCAA]/80 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Saúde Pública</span>
              <span class="bg-[#00995D]/20 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Cidadania Digital</span>
              <span class="bg-[#46E663]/40 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Tecnologia Colaborativa</span>
              <span class="bg-[#00995D]/40 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Inteligência Coletiva</span>
              <span class="bg-[#00995D]/20 font-bold px-4 py-1 rounded-full text-sm duration-300 hover:scale-105 hover:shadow-lg">Acesso a informação</span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-4">
          <img src="/images/equipetrabalhando.svg" alt="Equipe trabalhando" class="w-full h-auto object-contain" />
        </div>
      </div>

      <div class="h-px bg-gray-300 w-11/12 mx-auto my-12 md:my-16"></div>

      <div class="w-11/12 h-auto mx-auto flex flex-col-reverse md:flex-row gap-8">
        <div class="w-full md:w-2/5 p-4">
          <div class="w-full my-6 md:my-10">
            <img src="/images/mockupmobile.png" alt="Usuario acessando sistema" class="w-full h-auto object-contain" />
          </div>
        </div>
        <div class="w-full md:w-3/5 p-4">
          <div class="w-full">
            <h1 class="text-3xl font-bold text-center text-[#15553C]">Sobre o Projeto</h1>
            <p class="pt-5 md:pt-7 text-justify text-[#35644B]">
              Muitas pessoas enfrentam longas esperas sem saber onde serão melhor atendidas.
              Este projeto nasceu justamente para mudar essa realidade.
            </p>
            <p class="pt-5 md:pt-7 text-justify text-[#35644B]">
              A proposta é que os próprios usuários contribuam informando o status de cada unidade de saúde.
              Com base nessas informações, a plataforma atualiza e exibe o nível de lotação de cada local.
              É importante destacar que os dados apresentados não refletem 100% de precisão, pois são
              baseados nas contribuições da comunidade. <strong>Não temos vínculo com bancos de dados
              oficiais das unidades de saúde do Governo do Estado.</strong>
            </p>
            <p class="pt-5 md:pt-7 text-justify text-[#35644B]">
              Criamos uma plataforma simples, colaborativa e acessível, onde qualquer pessoa pode relatar como está a
              situação da unidade que visitou. Assim, juntos, ajudamos uns aos outros a escolher o melhor lugar
              para buscar atendimento — como um "Waze da saúde".
            </p>
            <p class="pt-5 md:pt-7 text-justify text-[#35644B]">
              Esta iniciativa apoia o Objetivo de Desenvolvimento Sustentável (ODS) 3 da ONU – Saúde e Bem-Estar –,
              promovendo um acesso mais justo, ágil e inteligente aos serviços de saúde, especialmente em comunidades
              com recursos limitados.
            </p>
          </div>
        </div>
      </div>

      <div class="h-px bg-gray-300 w-11/12 mx-auto my-12 md:my-16"></div>

      <div class="w-11/12 h-auto mb-20 md:mb-40 mx-auto flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-3/5 p-4">
          <div class="w-full">
            <h1 class="text-3xl font-bold text-[#15553C]">Onde Atuamos</h1>
            <p class="pt-5 md:pt-7 text-justify text-[#35644B]">
              Neste primeiro momento, nossa atuação está focada na cidade de <strong>Salvador – Bahia</strong>,
              onde iniciamos o projeto com o objetivo de testar, validar e impactar positivamente a realidade da população local.
            </p>
            <p class="pt-5 text-justify text-[#35644B]">
              A escolha de Salvador se deu por ser uma capital com grande demanda nos serviços de urgência e emergência,
              o que reforça a necessidade de uma ferramenta que ajude a população a tomar decisões mais informadas
              sobre onde buscar atendimento.
            </p>
            <p class="pt-5 text-justify text-[#35644B]">
              Acreditamos no poder da colaboração e da participação cidadã. Por isso, com o engajamento da comunidade
              e a divulgação do projeto, pretendemos expandir para outras cidades e estados do Brasil.
              Nossa meta é alcançar o maior número possível de pessoas que enfrentam dificuldades no
              acesso ao sistema público de saúde, promovendo informação, agilidade e qualidade no atendimento.
            </p>
            <p class="pt-5 text-justify text-[#35644B]">
              Cada usuário que compartilha uma informação ajuda a tornar o sistema mais justo, mais humano e mais eficiente.
              Com a sua ajuda, podemos transformar essa ideia em uma rede nacional de apoio à saúde pública.
            </p>
          </div>
        </div>
        <div class="w-full md:w-2/5 p-4">
          <div class="w-full my-6 md:my-10">
            <img src="/images/mapasalvador.png" alt="Mapa visual" class="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      <div class="h-px bg-gray-300 w-11/12 mx-auto my-12 md:my-16"></div>

      <div class="w-full bg-gradient-to-r from-[#004E4C] to-verdeClaro py-12 md:py-16">
        <div class="w-11/12 mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold text-center text-white">VALORES</h1>
          <div class="w-full mt-6 flex flex-col gap-6 items-center">
            <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-center text-white/90">
              <div><h2 class="text-xl md:text-2xl font-semibold">Colaboração</h2><p>Acreditamos na força da comunidade.</p></div>
              <div><h2 class="text-xl md:text-2xl font-semibold">Transparência</h2><p>Informação clara e aberta a todos.</p></div>
            </div>
            <div class="flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-center text-white/90">
              <div><h2 class="text-xl md:text-2xl font-semibold">Inovação</h2><p>Uso da tecnologia a favor da sociedade.</p></div>
              <div><h2 class="text-xl md:text-2xl font-semibold">Empatia</h2><p>Foco no bem-estar das pessoas.</p></div>
              <div><h2 class="text-xl md:text-2xl font-semibold">Cidadania Digital</h2><p>Participação ativa e consciente da população.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SobreNosComponent {
  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Perfil', href: '/perfil' },
  ];
}
