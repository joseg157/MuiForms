import { DemoForm, WizardDemoForm } from '@features/demo';

function Home() {
  return (
    <div className="tw:space-y-4">
      <DemoForm />

      <WizardDemoForm />
    </div>
  );
}

export default Home;
