import React from 'react';
import { ShieldCheck, Percent, Truck, Wrench, Award, Building2 } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: <Award className="w-8 h-8 text-orange-500" />,
    title: 'Официальный дилер 50+ брендов',
    desc: 'Прямые поставки оборудования от производителей Yamaha, Shure, JBL, Sennheiser без посредников.'
  },
  {
    icon: <Percent className="w-8 h-8 text-orange-500" />,
    title: 'Работа с НДС 20%',
    desc: 'Полный комплект закрывающих бухгалтерских документов (ТТН, ТН, счета-фактуры) для ЮР лиц и ИП.'
  },
  {
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    title: 'Собственный сервисный центр',
    desc: 'Авторизованная диагностика и ремонт звукового оборудования в Минске с оригинальными запчастями.'
  },
  {
    icon: <Truck className="w-8 h-8 text-orange-500" />,
    title: 'Доставка по Беларуси за 24ч',
    desc: 'Оперативная доставка курьерской службой DPD/Autolight по Минску, областным и районным центрам РБ.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: 'Гарантия до 36 месяцев',
    desc: '100% защита прав потребителя и расширенная официальная гарантия на весь ассортимент каталога.'
  },
  {
    icon: <Building2 className="w-8 h-8 text-orange-500" />,
    title: '1500+ реализованных объектов',
    desc: 'Успешно оснащенные звуком рестораны, школы, ТРЦ, фитнес-клубы и концертные залы по всей Беларуси.'
  }
];

export const WhyUs: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Почему выбирают ООО «Арт-Медиа Трейд»
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-2">
          Надежный поставщик профессиональной аудио и звуковой техники в Республике Беларусь
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADVANTAGES.map((adv, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-orange-500/80 hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-orange-50 rounded-2xl w-fit mb-4">
              {adv.icon}
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{adv.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
