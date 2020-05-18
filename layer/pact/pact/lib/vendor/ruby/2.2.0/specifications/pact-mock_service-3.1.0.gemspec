# -*- encoding: utf-8 -*-
# stub: pact-mock_service 3.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "pact-mock_service".freeze
  s.version = "3.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["James Fraser".freeze, "Sergei Matheson".freeze, "Brent Snook".freeze, "Ronald Holshausen".freeze, "Beth Skurrie".freeze]
  s.date = "2019-05-01"
  s.email = ["james.fraser@alumni.swinburne.edu".freeze, "sergei.matheson@gmail.com".freeze, "brent@fuglylogic.com".freeze, "uglyog@gmail.com".freeze, "beth@bethesque.com".freeze]
  s.executables = ["pact-mock-service".freeze, "pact-stub-service".freeze]
  s.files = ["bin/pact-mock-service".freeze, "bin/pact-stub-service".freeze]
  s.homepage = "https://github.com/bethesque/pact-mock_service".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.7.8".freeze
  s.summary = "Provides a mock service for use with Pact".freeze

  s.installed_by_version = "2.7.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rack>.freeze, ["~> 2.0"])
      s.add_runtime_dependency(%q<rspec>.freeze, [">= 2.14"])
      s.add_runtime_dependency(%q<find_a_port>.freeze, ["~> 1.0.1"])
      s.add_runtime_dependency(%q<thor>.freeze, ["~> 0.19"])
      s.add_runtime_dependency(%q<json>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<webrick>.freeze, ["~> 1.3"])
      s.add_runtime_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
      s.add_runtime_dependency(%q<pact-support>.freeze, ["~> 1.2", ">= 1.2.1"])
      s.add_runtime_dependency(%q<filelock>.freeze, ["~> 1.1"])
      s.add_development_dependency(%q<rack-test>.freeze, ["~> 0.7"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0.3"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 3.4"])
      s.add_development_dependency(%q<pry>.freeze, [">= 0"])
      s.add_development_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_development_dependency(%q<hashie>.freeze, ["~> 2.0"])
      s.add_development_dependency(%q<activesupport>.freeze, ["~> 5.1"])
      s.add_development_dependency(%q<faraday>.freeze, ["~> 0.12"])
      s.add_development_dependency(%q<octokit>.freeze, ["~> 4.7"])
      s.add_development_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<bump>.freeze, ["~> 0.5"])
    else
      s.add_dependency(%q<rack>.freeze, ["~> 2.0"])
      s.add_dependency(%q<rspec>.freeze, [">= 2.14"])
      s.add_dependency(%q<find_a_port>.freeze, ["~> 1.0.1"])
      s.add_dependency(%q<thor>.freeze, ["~> 0.19"])
      s.add_dependency(%q<json>.freeze, [">= 0"])
      s.add_dependency(%q<webrick>.freeze, ["~> 1.3"])
      s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
      s.add_dependency(%q<pact-support>.freeze, ["~> 1.2", ">= 1.2.1"])
      s.add_dependency(%q<filelock>.freeze, ["~> 1.1"])
      s.add_dependency(%q<rack-test>.freeze, ["~> 0.7"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0.3"])
      s.add_dependency(%q<webmock>.freeze, ["~> 3.4"])
      s.add_dependency(%q<pry>.freeze, [">= 0"])
      s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_dependency(%q<hashie>.freeze, ["~> 2.0"])
      s.add_dependency(%q<activesupport>.freeze, ["~> 5.1"])
      s.add_dependency(%q<faraday>.freeze, ["~> 0.12"])
      s.add_dependency(%q<octokit>.freeze, ["~> 4.7"])
      s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
    end
  else
    s.add_dependency(%q<rack>.freeze, ["~> 2.0"])
    s.add_dependency(%q<rspec>.freeze, [">= 2.14"])
    s.add_dependency(%q<find_a_port>.freeze, ["~> 1.0.1"])
    s.add_dependency(%q<thor>.freeze, ["~> 0.19"])
    s.add_dependency(%q<json>.freeze, [">= 0"])
    s.add_dependency(%q<webrick>.freeze, ["~> 1.3"])
    s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
    s.add_dependency(%q<pact-support>.freeze, ["~> 1.2", ">= 1.2.1"])
    s.add_dependency(%q<filelock>.freeze, ["~> 1.1"])
    s.add_dependency(%q<rack-test>.freeze, ["~> 0.7"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0.3"])
    s.add_dependency(%q<webmock>.freeze, ["~> 3.4"])
    s.add_dependency(%q<pry>.freeze, [">= 0"])
    s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
    s.add_dependency(%q<hashie>.freeze, ["~> 2.0"])
    s.add_dependency(%q<activesupport>.freeze, ["~> 5.1"])
    s.add_dependency(%q<faraday>.freeze, ["~> 0.12"])
    s.add_dependency(%q<octokit>.freeze, ["~> 4.7"])
    s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
    s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
  end
end
